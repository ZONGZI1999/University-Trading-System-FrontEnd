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
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="item" label="Item"> </el-table-column>
        <el-table-column prop="price" label="Price" width="200">
        </el-table-column>
        <el-table-column prop="tag" label="Operation" width="200">
          <template slot-scope="scope">
            <el-link
              style="margin: 5px"
              type="primary"
              @click="viewOrderDetails(scope.row.id)"
              >View</el-link
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
    viewOrderDetails(id) {
      console.log(id);
      this.$router.push({
        path: "/ItemDetail",
        query: {
          id: id,
        },
      });
    },
  },
  async created() {
    var that = this;
    await this.axios
      .get("http://localhost:8081/item/queryItems")
      .then((resp) => {
        var respData = resp.data.data;
        console.log(respData);
        for (var i = 0; i < respData.length; i++) {
          var needToPush = {
            pic: {
              main: respData[i].itemImage[0],
              picList: respData[i].itemImage,
            },
            id: respData[i].itemId,
            item: respData[i].itemTitle,
            price: respData[i].itemPrice / 100.0,
          };
          console.log(needToPush);
          that.orderList.push(needToPush);
          console.log(that.orderList);
        }
      });
    for (var i = 0; i < this.orderList.length && i < 10; i++) {
      this.showList.push(this.orderList[i]);
    }
  },
};
</script>