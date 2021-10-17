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
          <h2>$ 100.00</h2>
        </el-card>
      </el-col>
      <!-- Buyer -->
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Buyer Order</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >View</el-button
            >
          </div>
          <h2>
            Paid: 2 <el-divider direction="vertical"></el-divider> Delivery: 2
          </h2>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Seller Order</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >View</el-button
            >
          </div>
          <h2>
            Unsold: 3<el-divider direction="vertical"></el-divider>Paid:
            2<el-divider direction="vertical"></el-divider>Delivery: 2
          </h2>
        </el-card>
      </el-col>
    </el-row>
    <el-divider>Evaluation</el-divider>

    <el-table :data="evaluationData" style="width: 100%" max-height="250">
      <el-table-column fixed prop="evalutaionDate" label="Evaluation Date" width="200">
      </el-table-column>
      <el-table-column prop="orderId" label="Order ID" width="120"> </el-table-column>
      <el-table-column prop="as" label="AS" width="120">
      </el-table-column>
      <el-table-column prop="itemTitle" label="Item Title" width="120"> </el-table-column>
      <el-table-column prop="evalutaion" label="Evalutaion">
      </el-table-column>
      <el-table-column fixed="right" label="Operation" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            移除
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
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
      evaluationData: [
        {
          evalutaionDate: '2021-10-13 23:07:05',
          orderId: '123',
          as: '123',
          itemTitle:'123',
          evalutaion:'aaaaaaaa'
        }
      ]
    };
  },
};
</script>