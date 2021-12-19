<template>
  <div>
    <el-container>
      <el-table
          ref="filterTable"
          :data="orderList"
          style="width: 100%">
        <el-table-column
            prop="orderDate"
            label="Order Date"
            sortable
            width="180"
            column-key="orderDate"
        >
        </el-table-column>
        <el-table-column
            prop="orderNo"
            label="Order No."
            width="200">
        </el-table-column>
        <el-table-column
            label="Pic."
            width="250">
          <template slot-scope="scope">
            <el-image
                style="width: 200px;"
                :src="scope.row.pic.main"
                :preview-src-list="scope.row.pic.picList">
              <template slot="error">
                <div style="text-align: center;">
                  <img :src="errPath" alt="100px"/> <br/>
                  NO IMAGE GIVEN
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="item"
            label="Item"
        >
        </el-table-column>
        <el-table-column
            prop="price"
            label="Price"
            sortable
            width="200">
        </el-table-column>
        <el-table-column
            prop='step'
            label="Current State"
            width="200"
            :filters="stepToText"
            :filter-method="filterTag"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="tagType(getStepName(scope.row.step))">{{ getStepName(scope.row.step) }}</el-tag>

          </template>
        </el-table-column>
        <el-table-column
            prop="tag"
            label="Operation"
            width="200">
          <template slot-scope="scope">
            <el-link style="margin: 5px" type="primary" @click="viewOrderDetails(scope.row.orderNo)">View Details
            </el-link>
            <!--                <el-link style="margin: 5px" type="danger" :disabled="false" @click="viewOrderDetails(scope.row.tag)">Delete</el-link>-->
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<style>

</style>

<script>
export default {
  data() {
    return {
      stepToText: [
        {text: 'CREATED', value: '0'},
        {text: 'PAID', value: '1'},
        {text: 'ON_DELIVERY', value: '2'},
        {text: 'ON_RECEIVED', value: '3'},
        {text: 'FINISH', value: '4'},
        {text: 'HAS_REFUND', value: '6'},
        {text: 'CLOSED', value: '7'},
      ],
      orderList: [],
      errPath: require("@/assets/forbidden.png")
    }
  },
  methods: {
    filterTag(value, row) {
      return row.step === value;
    },
    viewOrderDetails(index) {
      console.log("view order details " + index)
      this.$router.push({
        path: "/Order/Details",
        query: {
          orderId: index,
        },
      });
    },


    getStepName(step) {
      for (var index in this.stepToText) {
        if (step == this.stepToText[index].value) {
          return this.stepToText[index].text
        }
      }
    },
    fromStepNameToValue(step) {
      for (var index in this.stepToText) {
        if (step == this.stepToText[index].text) {
          return this.stepToText[index].value
        }
      }
    },
    tagType(status) {
      if (status === "FINISH") {
        return 'success'
      }
      if (status === 'HAS_REFUND') {
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
  watch: {
    async $route(to, from) {
      var respData = null;
      this.orderList = []
      console.log(to.path);
      if (to.path == "/SellerOrderList") {
        console.log("seller mode")
        await this.axios.get("http://localhost:8081/order/queryOrderList/seller", {params: {studentId: "SWE1809387"}})
            .then(resp => {
              respData = resp.data.data
            })
      }
      if (to.path == "/BuyerOrderList") {
        console.log("buyer mode")
        await this.axios.get("http://localhost:8081/order/queryOrderList/buyer", {params: {studentId: "SWE1809388"}})
            .then(resp => {
              respData = resp.data.data
            })
      }
      if (respData != null) {
        console.log(respData)
        for (var index = 0; index < respData.length; index++) {
          var picList = []
          let itemTitle = "";
          let itemPrice = "";
          await this.axios.get("http://localhost:8081/item/queryOneItem", {params: {itemId: respData[index].itemId}})
              .then(resp => {
                picList = resp.data.data.itemImage
                itemTitle = resp.data.data.itemTitle
                itemPrice = resp.data.data.itemPrice / 100.00
              })
          this.orderList.push({
            orderDate: respData[index].createTime,
            orderNo: respData[index].orderId,
            pic: {
              main: picList[0],
              picList: picList
            },
            item: itemTitle,
            price: "$ " + itemPrice,
            step: this.fromStepNameToValue(respData[index].orderStatus)

          })
        }

      }
    }
  },
  async created() {
    var respData = null;
    if (this.$route.path == "/SellerOrderList") {
      console.log("seller mode")
      await this.axios.get("http://localhost:8081/order/queryOrderList/seller", {params: {studentId: "SWE1809387"}})
          .then(resp => {
            if (resp.data.code == 0) {
              respData = resp.data.data
            }
          })
    }
    if (this.$route.path == "/BuyerOrderList") {
      console.log("buyer mode")
      await this.axios.get("http://localhost:8081/order/queryOrderList/buyer", {params: {studentId: "SWE1809388"}})
          .then(resp => {
            if (resp.data.code == 0) {
              respData = resp.data.data
            }
          })
    }
    if (respData != null) {
      console.log(respData)
      for (var index = 0; index < respData.length; index++) {
        var picList = []
        let itemTitle = "";
        let itemPrice = "";
        await this.axios.get("http://localhost:8081/item/queryOneItem", {params: {itemId: respData[index].itemId}})
            .then(resp => {
              picList = resp.data.data.itemImage
              itemTitle = resp.data.data.itemTitle
              itemPrice = resp.data.data.itemPrice / 100.00
            })
        this.orderList.push({
          orderDate: respData[index].createTime,
          orderNo: respData[index].orderId,
          pic: {
            main: picList[0],
            picList: picList
          },
          item: itemTitle,
          price: "$ " + itemPrice,
          step: this.fromStepNameToValue(respData[index].orderStatus)

        })
      }

    }
  }
}
</script>