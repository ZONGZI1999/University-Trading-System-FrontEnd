<template>
  <div>
    <!-- 
      Order State
       Just Create 0
       Created 1
       Paid 2
       No Delivery 3
       Delivery 4
       Comfirm 5
       Evaluation 6
     -->
    <el-steps
      :active="elStep"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="Create Order"></el-step>
      <el-step title="Paid Money" :status="stepStatus.Paid"></el-step>
      <el-step title="Delivery Item" :status="stepStatus.Delivery"></el-step>
      <el-step title="Confirm Order" :status="stepStatus.Confirm"></el-step>
      <el-step title="Evaluation"></el-step>
    </el-steps>

    <!-- Order Details -->
    <el-container v-if="step > 0">
      <el-descriptions :column="4" style="width: 100%" direction="vertical" border>
        <template slot="title">
          Order Details
            <el-popover
              placement="right-start"
              title="Timeline"
              width="200"
              trigger="hover"
            >
            <el-timeline :reverse="reverse">
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp">
                {{activity.content}}
              </el-timeline-item>
            </el-timeline>
              <el-button icon="el-icon-time" size="mini" slot="reference">Timeline</el-button>
            </el-popover>
        </template>
        <!-- Order No -->
        <el-descriptions-item :span="step < 2 ? 2 : 1">
          <template slot="label">
            <div class="item-label">Order No.</div>
          </template>
          <div class="item-label">
            11111
          </div>
        </el-descriptions-item>
        <!-- Payment -->
        <el-descriptions-item :span="1" v-if="step > 1">
          <template slot="label">
            <div class="item-label">Payment</div>
          </template>
          <div class="item-label">
            Balance
          </div>
        </el-descriptions-item>
        <!-- Pay No. -->
        <el-descriptions-item :span="1" v-if="step > 1">
          <template slot="label">
            <div class="item-label">Pay No.</div>
          </template>
          <div class="item-label">
            aaaaaa
          </div>
        </el-descriptions-item>
        <!-- Seller -->
        <el-descriptions-item :span="step < 2 ? 2 : 1">
          <template slot="label">
            <div class="item-label">Seller</div>
          </template>
          <div class="item-label">
            Zekizheng
          </div>
        </el-descriptions-item>
        <!-- Seller Evaluation -->
        <el-descriptions-item :span="2" v-if="step == 5">
          <template slot="label">
            <div class="item-label">Seller Evaluation</div>
          </template>
          <div class="item-label">
            Zekizheng
          </div>
        </el-descriptions-item>
        <!-- Buyer Evaluation -->
        <el-descriptions-item :span="2" v-if="step == 5">
          <template slot="label">
            <div class="item-label">Buyer Evaluation</div>
          </template>
          <div class="item-label">
            Zekizheng
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-container>

    <!--Delivery Address-->
    <el-container>
      <el-descriptions  :column="6" style="width: 100%" border>
        <template slot="title">
          Delivery Address
          <el-button
            v-if="showModule.addressSelectButton"
            type="primary"
            size="small"
            @click="dialogTableVisible = true"
            >Select</el-button
          >
        </template>
        <el-descriptions-item :span="2" v-if="deliveryInfo.name != ''">
          <template slot="label">
            <div class="item-label">Name</div>
          </template>
          {{deliveryInfo.name}}
        </el-descriptions-item>
        <el-descriptions-item :span="2" v-if="deliveryInfo.phone != ''">
          <template slot="label">
            <div class="item-label">Phone No.</div>
          </template>
          {{deliveryInfo.phone}}
        </el-descriptions-item>
        <el-descriptions-item :span="2" v-if="deliveryInfo.address != ''">
          <template slot="label">
            <div class="item-label">Delivery Address</div>
          </template>
          {{deliveryInfo.address}}
        </el-descriptions-item>
        <el-descriptions-item v-if="showModule.deliveryInfo" :span="2">
          <template slot="label">
            <div class="item-label">Delivery Time</div>
          </template>
          None
        </el-descriptions-item>
        <el-descriptions-item v-if="showModule.deliveryInfo"  :span="2">
          <template slot="label">
            <div class="item-label">Delivery Company</div>
          </template>
          None
        </el-descriptions-item>
        <el-descriptions-item v-if="showModule.deliveryInfo" :span="2">
          <template slot="label">
            <div class="item-label">Tracking No.</div>
          </template>
          None
        </el-descriptions-item>
      </el-descriptions>
    </el-container>

    <!-- Item Details -->
    <el-container>
      <div>
        <el-row>
          <el-col :span="4">
            <div class="block">
              <span class="demonstration"></span>
              <el-image
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="cover"
              ></el-image>
            </div>
          </el-col>
          <el-col :span="18">
            <h3 style="margin-bottom: 10px; margin-top: 0px">
              NETEL Penganjur Dapur Ketuhar Ketuhar Ketuhar Rak Diperkembangkan
              Boleh Laras dan Ketinggian Boleh Laras Penyimpanan Dapur Rak
              1/2-Tier Kabinet Dapur Rak Penyimpanan rak Pemegang Peralatan
            </h3>
            <div class="sub-title">Remark To Seller</div>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="Remark To Seller"
              v-model="remark"
              :readonly="textIsReadOnly"
            >
            </el-input>

            <div class="price-title">
              $ 10.00
              <div style="position: absolute; right: 75px">
                <el-button 
                  v-if="buttonName.button1 != ''"
                  type="primary" 
                  @click="button1Click"
                  :loading="buttonLoading.button1"
                  >
                  {{buttonName.button1}}
                </el-button>
                <el-button 
                  v-if="buttonName.button2 != ''"
                  type="danger" 
                  @click="button2Click"
                  :loading="buttonLoading.button2"
                  >
                  {{buttonName.button2}}
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-container>

    <el-container>

    </el-container>

    <!-- Choose Delivery Address -->
    <el-dialog
      title="Choose a Delivery Address"
      :visible.sync="dialogTableVisible"
    >
      <el-table
        :data="
          addressData.filter(
            (data) =>
              !search || data.address.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
        max-height="1000"
      >
        <el-table-column label="Name" prop="name" width="150" fixed=""> </el-table-column>
        <el-table-column label="Phone No." prop="phone" width="150"> </el-table-column>
        <el-table-column label="Delivery Address" prop="address" > </el-table-column>
        <el-table-column align="center" min-width="100">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <div>
              <el-button 
                size="mini"
                @click="selectAddress(scope.$index, scope.row)"
              >
                Select
              </el-button>
              <el-button
                size="mini"
                type="info"
                @click="editAddress(scope.$index, scope.row)"
                >Edit</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="deleteAddress(scope.$index, scope.row)"
                >Delete</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- Test Button -->
    <el-button type="primary" @click="stepInc">+</el-button>
    <el-button type="success" @click="stepDes">-</el-button>
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

.sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: #8492a6;
}

.price-title {
  margin-top: 20px;
  font-size: 20px;
  color: crimson;
  text-align: left;
}

.item-label {
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      addressData: [
        {
          name: "Zekizheng",
          phone: "1806000000",
          address: "Jalan Sunsuria, Bandar Sunsuria, 43900 Sepang, Selangor Darul Ehsan, Malaysia",
        },
        {
          name: "Test",
          phone: "11111",
          address: "Jalan Sunsuria, TEST AREA Bandar Sunsuria, 43900 Sepang, Selangor Darul Ehsan, Malaysia",
        },
      ],
      deliveryInfo: {
        name: "",
        phone: "",
        address: ""
      },
      showModule: {
        addressSelectButton: true,
        deliveryInfo: false,
      },
      buttonName: {
        button1: "Create",
        button2: "Cancel",
      },
      stepStatus:{
        Paid:'',
        Delivery:'',
        Confirm:''
      },
      reverse: true,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }],
      elStep: 0,
      search: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      remark: "",
      step: 0,
      textIsReadOnly: false,
      buttonLoading: {
        button1: false,
        button2: false
      }
    };
  },
  methods: {
    selectAddress(index, row){
      console.log("select address");
      console.log(index, row);
      this.deliveryInfo.name = row.name
      this.deliveryInfo.phone = row.phone
      this.deliveryInfo.address = row.address
      this.dialogTableVisible = false
      this.$message({
        message: 'Set address successfully!',
        type: 'success'
      });
    },
    editAddress(index, row) {
      console.log("edit address");
      console.log(index, row);
    },
    deleteAddress(index, row) {
      console.log("delete address");
      console.log(index, row);
    },
    stepInc() {
      if (this.step < 5) {
        this.step++;
      }
    },
    stepDes() {
      if (this.step > 0) {
        this.step--;
      }
    },
    button1Click(){
      console.log("Button 1 Click");
      this.buttonLoading.button1 = true
      var that = this
      setTimeout(function() {
        that.step++
        that.buttonLoading.button1 = false
      },1000)
      
    },
    button2Click(){
      console.log("Button 2 Click")
    }
  },
  watch:{
    step(){
      switch (this.step) {
        case 0: //just create
          this.elStep = 0;
          this.showModule.addressSelectButton = true;
          this.showModule.deliveryInfo = false;
          this.textIsReadOnly = false
          this.buttonName.button1 = "Create";
          this.buttonName.button2 = "Cancel";
          break;
        case 1: //created
          this.elStep = 1;
          this.showModule.addressSelectButton = true;
          this.showModule.deliveryInfo = false;
          this.textIsReadOnly = true
          this.buttonName.button1 = "Pay";
          this.buttonName.button2 = "Cancel Order";
          console.log(1);
          break;
        case 2: //paid
          this.elStep = 2;
          this.showModule.addressSelectButton = false;
          this.showModule.deliveryInfo = false;
          this.textIsReadOnly = true
          this.buttonName.button1 = "Ask";
          this.buttonName.button2 = "Cancel Order";
          break;
        case 3:
          this.elStep = 3;
          this.showModule.addressSelectButton = false;
          this.showModule.deliveryInfo = true;
          this.textIsReadOnly = true
          this.buttonName.button1 = "Confirm Order";
          this.buttonName.button2 = "Apply Refund";
          break;
        case 4:
          this.elStep = 4;
          this.showModule.addressSelectButton = false;
          this.showModule.deliveryInfo = true;
          this.textIsReadOnly = true
          this.buttonName.button1 = "Give Evalutaion";
          this.buttonName.button2 = "";
          break;
        case 5:
          this.elStep = 5;
          this.showModule.addressSelectButton = false;
          this.showModule.deliveryInfo = true;
          this.textIsReadOnly = true
          this.buttonName.button1 = "";
          this.buttonName.button2 = "";
          break;
        default:
          console.log(this.step);
          break;
      }
      console.log(this.step);
    }
  },
  created() {

  },
};
</script>
