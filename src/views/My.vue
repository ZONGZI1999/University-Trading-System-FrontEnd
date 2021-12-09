<template>
  <div>
    <el-row>
      <!-- My Center -->
      <el-col>
        <h1 style="text-align: center">My Center</h1>
      </el-col>
      <!-- Balance -->
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Balance</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >Top Up</el-button
            >
          </div>
          <h2>$ {{balance/100.00}}</h2>
        </el-card>
      </el-col>
      <!-- Buyer -->
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Buyer Order</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="viewBuyerOrder"
              >View</el-button
            >
          </div>
          <h2>
            Paid: {{buyerPaid}} <el-divider direction="vertical" /> On Delivery: {{buyerDelivery}}
          </h2>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Seller Order</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="viewSellerOrder"
              >View</el-button
            >
          </div>
          <h2>
            Unsold: {{sellerUnsold}}<el-divider direction="vertical"></el-divider>Paid: {{sellerPaid}}
            <el-divider direction="vertical"></el-divider>Delivery: {{ sellerDelivery }}
          </h2>
        </el-card>
      </el-col>
    </el-row>
    <el-divider>My Recent Evaluation</el-divider>

    <el-table :data="evaluationData" style="width: 100%" max-height="250">
      <el-table-column fixed prop="orderCreateDate" label="Evaluation Date" width="200">
      </el-table-column>
      <el-table-column prop="itemTitle" label="Item Title" width="120"> </el-table-column>
      <el-table-column prop="evaluationFromBuyer" label="Evaluation From Buyer"></el-table-column>
      <el-table-column prop="evaluationFromSeller" label="Evaluation From Seller"></el-table-column>
      <el-table-column fixed="right" label="Operation" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, evaluationData)"
            type="text"
            size="small"
          >
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 5px;
}
</style>

<script>
export default {
  data() {
    return {
      evaluationData: [

      ],
      buyerPaid: 0,
      buyerDelivery: 0,
      sellerUnsold: 0,
      sellerPaid: 0,
      sellerDelivery: 0,
      balance: 0
    };
  },
  methods:{
    viewBuyerOrder() {
      this.$router.push("/buyerOrderList")
    },
    viewSellerOrder() {
      this.$router.push("/SellerOrderList")
    }
  },
  async created() {
    let respData
    await this.axios.get("http://localhost:8081/order/queryOrderList/all", {params:{studentId:"SWE1809388"}})
        .then(resp => {
          console.log(resp)
          if(resp.data.code == 0) {
            respData = resp.data.data
          } else {
            this.$message.error(resp.data.description)
            return false;
          }
        })
        .catch(err => {
          this.$message.error("Internal error!")
          return false;
        })
    for (var index = 0; index < respData.length; index++) {
      if (respData[index].orderStatus != "FINISH") {
        continue
      }
      var itemTitle;
      await this.axios.get("http://localhost:8081/item/queryOneItem", {params:{itemId: respData[index].itemId}})
          .then(resp => {
            if(resp.data.code == 0 ) {
              itemTitle = resp.data.data.itemTitle
            } else {
              this.$message.error(resp.data.description)
              return false;
            }
          })
      .catch(err=>{
        this.$message.error("Internal error")
        return false;
      })
      this.evaluationData.push({
        orderCreateDate: respData[index].createTime,
        itemTitle: itemTitle,
        evaluationFromBuyer: respData[index].buyerEvaluation,
        evaluationFromSeller: respData[index].sellerEvaluation
      })
    }
    await this.axios.get("http://localhost:8081/order/queryOrderList/buyer", {params:{studentId:"SWE1809388"}})
        .then(resp => {
          if(resp.data.code == 0) {
            respData = resp.data.data
          }
        })
    for (var index = 0; index < respData.length; index++) {
      if (respData[index].orderStatus == 'PAID'){
        this.buyerPaid++
      }
      if (respData[index].orderStatus == 'ON_DELIVERY'){
        this.buyerDelivery++
      }
    }
    await this.axios.get("http://localhost:8081/order/queryOrderList/seller", {params:{studentId:"SWE1809387"}})
        .then(resp => {
          if(resp.data.code == 0) {
            respData = resp.data.data
          }
        })
    for (var index = 0; index < respData.length; index++) {
      if (respData[index].orderStatus == 'PAID'){
        this.sellerPaid++
      }
      if (respData[index].orderStatus == 'ON_DELIVERY'){
        this.sellerDelivery++
      }
    }
    await this.axios.get("http://localhost:8081/item/queryItems")
        .then(resp => {
          console.log(resp)
          if(resp.data.code == 0) {
            respData = resp.data.data
          }
        })
    for (var index = 0; index < respData.length; index++) {
      if (respData[index].itemStatus == 'ON_SELL'){
        this.sellerUnsold++
      }
    }
    await this.axios.get("http://localhost:8081/balance/queryBalance")
                    .then(resp => {
                      console.log(resp)
                      if(resp.data.code == 0) {
                        this.balance = resp.data.data.balance
                      }
                    })

  }
};
</script>