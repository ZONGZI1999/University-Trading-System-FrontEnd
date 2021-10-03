<template>
  <div>
    <el-steps
      :active="1"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="Create Order"></el-step>
      <el-step title="Paid Money"></el-step>
      <el-step title="Delivery Item"></el-step>
      <el-step title="Confirm Order"></el-step>
      <el-step title="Evaluation"></el-step>
    </el-steps>
    <!--Delivery Address-->
    <el-descriptions
      title="Delivery Address"
      :column="2"
      style="width: 60%"
      border
    >
      <template slot="title">
        Delivery Address
        <el-button
          type="primary"
          size="small"
          @click="dialogTableVisible = true"
          >Select</el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <div style="text-align: center">Name</div>
        </template>
        Zekizheng
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <div style="text-align: center">Phone No.</div>
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <div style="text-align: center">Delivery Address</div>
        </template>
        Jalan Sunsuria, Bandar Sunsuria, 43900 Sepang, Selangor Darul Ehsan,
        Malaysia
      </el-descriptions-item>
    </el-descriptions>

    <div>
      <el-row>
        <el-col :span="4">
          <div class="block">
            <span class="demonstration"></span>
            <el-image
              src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              fit="cover"
            ></el-image>
          </div>
        </el-col>
        <el-col :span="18">
          <h3 style="margin-bottom: 10px; margin-top: 0px">
            NETEL Penganjur Dapur Ketuhar Ketuhar Ketuhar Rak Diperkembangkan Boleh Laras dan Ketinggian Boleh Laras Penyimpanan Dapur Rak 1/2-Tier Kabinet Dapur Rak Penyimpanan rak Pemegang Peralatan
          </h3>
          <div class="sub-title">Remark To Seller</div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="Remark To Seller"
            v-model="remark">
          </el-input>
          
          <div class="price-title"> 
            $ 10.00 
            <el-button type="primary" style="position: absolute; right: 75px;"> Create Order</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Choose Delivery Address -->
    <el-dialog
      title="Choose a Delivery Address"
      :visible.sync="dialogTableVisible"
    >
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="Date" prop="date"> </el-table-column>
        <el-table-column label="Name" prop="name"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini"> Select </el-button>
            <el-button
              size="mini"
              type="info"
              @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style scoped>
.text {
  font-size: 14px;
}
.el-container {
  margin-top: 30px;
}
.item {
  margin-bottom: 10px;
}
.label-style {
  text-align: center;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 400px;
}

.el-col {
  margin: 20px;
}

.sub-title{
  margin-bottom: 10px;
    font-size: 14px;
    color: #8492a6;
}

.price-title{
  margin-top: 20px;
  font-size: 20px;
  color: crimson;
  text-align: left;
}

</style>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      search: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      remark: ''
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>
