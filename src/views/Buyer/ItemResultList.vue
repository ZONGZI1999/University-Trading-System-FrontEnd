<template>
  <div>
    <el-container>
      <el-table ref="filterTable" :data="showList" style="width: 100%">
        <el-table-column prop="createTime" sortable label="Post Time"></el-table-column>
        <el-table-column label="Pic." width="250">
          <template slot-scope="scope">
            <el-image
              style="width: 200px"
              :src="scope.row.pic.main"
              :preview-src-list="scope.row.pic.picList"
            >
              <template slot="error">
                <div style="text-align: center; height: 100px">
                NO IMAGE GIVEN
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="item" label="Item"></el-table-column>
        <el-table-column prop="seller" label="Seller" v-if="this.$route.path === '/Search'">
        </el-table-column>
        <el-table-column
            v-if="this.$route.path !== '/Search'"
            prop="status"
            label="Current Status"
            :filters="stepToText"
            :filter-method="filterTag"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="tagType(scope.row.status)">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price" sortable label="Price" width="200">
          <template slot-scope="scope">
            $ {{scope.row.price}}
          </template>
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
      stepToText:[
        { text: 'ON_SELL', value: '8'},
        { text: 'CREATED', value: '0'},
        { text: 'PAID', value: '1'},
        { text: 'ON_DELIVERY', value: '2'},
        { text: 'ON_RECEIVED', value: '3'},
        { text: 'FINISH', value: '4'},
        { text: 'HAS_REFUND', value: '6'},
        { text: 'CLOSED', value: '7'},
      ],
      valueToText: {
        8: "ON_SELL",
        0: "CREATED",
        1: "PAID",
        2: "ON_DELIVERY",
        3: "ON_RECEIVED",
        4: "FINISH",
        6: "HAS_REFUND",
        7: "CLOSED"
      }
    };
  },
  methods: {
    filterTag(value, row) {
      console.log(value)
      return row.status === this.valueToText[value];
    },
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
    tagType(status){
      if (status === "FINISH"){
        return 'success'
      }
      if (status === 'HAS_REFUND'){
        return "danger"
      }
      if (status === "CLOSED") {
        return "warning"
      }
      if (status === "CREATED") {
        return "info"
      }
      return ""
    }

  },
  watch:{
    $route(){
      this.$router.go(0)
    }
  },
  async created() {
    var that = this;
    if (this.$route.path === "/Search") {
      await this.axios
          .get("http://localhost:8081/item/searchItems", {params: {keywords: this.$route.query.keywords}})
          .then(async (resp) => {
            if (resp.data.code === 0) {
              var respData = resp.data.data;
              console.log(respData);
              for (var i = 0; i < respData.length; i++) {
                var status = respData[i].itemStatus
                var orderId = null;
                if (status == 'SOLD') {
                  continue;
                }
                var studentName
                await this.axios.get('http://localhost:8081/student/getByStudentId', {params:{studentId: respData[i].sellerId}})
                    .then(resp => {
                      console.log(resp)
                      if (resp.data.code === 0) {
                        studentName = resp.data.data.studentName
                      }
                    })
                var needToPush = {
                  pic: {
                    main: respData[i].itemImage[0],
                    picList: respData[i].itemImage,
                  },
                  status: status,
                  id: respData[i].itemId,
                  item: respData[i].itemTitle,
                  seller: studentName,
                  orderId: orderId,
                  createTime : respData[i].createTime,
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
    } else {
      await this.axios
          .get("http://localhost:8081/item/queryItems")
          .then(async (resp) => {
            if (resp.data.code === 0) {
              var respData = resp.data.data;
              console.log("resp data ", respData);
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
                  createTime: respData[i].createTime,
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
    }

    for (var i = 0; i < this.orderList.length && i < 10; i++) {
      this.showList.push(this.orderList[i]);
    }
  },
};
</script>