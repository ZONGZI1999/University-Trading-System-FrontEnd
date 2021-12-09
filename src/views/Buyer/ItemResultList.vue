<template>
  <div>
    <el-container>
      <el-table ref="filterTable" :data="showList" style="width: 100%">
        <el-table-column label="Pic." width="250">
          <template slot-scope="scope">
            <el-image
              style="width: 200px"
              :src="scope.row.pic.main"
              :preview-src-list="scope.row.pic.picList"
            >
              <template slot="error">
                <div style="text-align: center">
                NO IMAGE GIVEN
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="item" label="Item"> </el-table-column>
        <el-table-column prop="status" label="Current Status"> </el-table-column>
        <el-table-column prop="price" label="Price" width="200">
        </el-table-column>
        <el-table-column prop="tag" label="Operation" width="200">
          <template slot-scope="scope">
            <el-link
              style="margin: 5px"
              type="primary"
              v-if="scope.row.orderId != null"
              @click="viewOrderDetails(scope.row.id, scope.row.orderId)"
              >View Order</el-link
            >
            <el-link
                style="margin: 5px"
                type="primary"
                @click="viewOrderDetails(scope.row.id, null)"
            >View Item</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <el-container>
      <el-pagination
        :hide-on-single-page="false"
        :total="orderList.length"
        layout="prev, pager, next"
        style="margin: 0 auto; margin-top: 15px"
        @current-change="pageChange"
      >
      </el-pagination>
    </el-container>
  </div>
</template>

<style>
</style>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      orderList: [
        // store all result
      ],
      showList: [
        // use to store result showing to user
      ],
    };
  },
  methods: {
    pageChange(page) {
      $("html, body").animate({ scrollTop: 0 }, 400); //Scroll to Top
      this.showList = [];
      for (
        var i = (page - 1) * 10;
        i < page * 10 && i < this.orderList.length;
        i++
      ) {
        this.showList.push(this.orderList[i]);
      }
    },
    viewOrderDetails(id, orderId) {
      console.log(id);
      if(orderId != null) {
        this.$router.push({
          path: "/Order/Details",
          query: {
            orderId: orderId,
          },
        });
      } else {
        this.$router.push({
          path: "/ItemDetail",
          query: {
            id: id,
          },
        });
      }

    },
  },
  async created() {
    var that = this;
    await this.axios
      .get("http://localhost:8081/item/queryItems")
      .then(async (resp) => {
        if (resp.data.code === 0) {
          var respData = resp.data.data;
          console.log(respData);
          for (var i = 0; i < respData.length; i++) {
            var status = respData[i].itemStatus
            var orderId = null;
            if (status == 'SOLD') {
              await this.axios.get("http://localhost:8081/order/queryOrderByItemId", {params: {itemId: respData[i].itemId}})
                  .then(resp => {
                    if(resp.data.code == 0) {
                      status = resp.data.data.orderStatus
                      orderId = resp.data.data.orderId
                    } else {
                      this.$message.error(resp.data.message + ": " + resp.data.description)
                    }
                  })
                  .catch(err => {
                    this.$message.error(err.toString())
                  })
            }
            var needToPush = {
              pic: {
                main: respData[i].itemImage[0],
                picList: respData[i].itemImage,
              },
              status: status,
              id: respData[i].itemId,
              item: respData[i].itemTitle,
              orderId: orderId,
              price: respData[i].itemPrice / 100.0,
            };
            console.log(needToPush);
            that.orderList.push(needToPush);
            console.log(that.orderList);
          }
        } else {
          this.$message.error(resp.data.message + ": " + resp.data.description)
        }

      });
    for (var i = 0; i < this.orderList.length && i < 10; i++) {
      this.showList.push(this.orderList[i]);
    }
  },
};
</script>