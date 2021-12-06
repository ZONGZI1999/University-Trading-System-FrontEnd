<template>
  <div>
    <div v-if="showAll">
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
        <el-descriptions
          :column="4"
          style="width: 100%"
          direction="vertical"
          border
        >
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
                  :timestamp="activity.timestamp"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
              <el-button icon="el-icon-time" size="mini" slot="reference"
                >Timeline</el-button
              >
            </el-popover>
          </template>
          <!-- Current State -->
          <el-descriptions-item :span="step < 2 ? 2 : 1">
            <template slot="label">
              <div class="item-label">Current State</div>
            </template>
            <div class="item-label">
              {{ orderInfo.orderStatus }}
            </div>
          </el-descriptions-item>
          <!-- Order No -->
          <el-descriptions-item :span="step < 2 ? 2 : 1">
            <template slot="label">
              <div class="item-label">Order No.</div>
            </template>
            <div class="item-label">
              {{ orderInfo.orderDetails.orderNo }}
            </div>
          </el-descriptions-item>
          <!-- Payment -->
          <el-descriptions-item :span="1" v-if="step > 1">
            <template slot="label">
              <div class="item-label">Payment</div>
            </template>
            <div class="item-label">
              {{ orderInfo.payment.paymentMethod }}
            </div>
          </el-descriptions-item>
          <!-- Pay No. -->
          <el-descriptions-item :span="1" v-if="step > 1">
            <template slot="label">
              <div class="item-label">Pay No.</div>
            </template>
            <div class="item-label">
              {{ orderInfo.payment.paymentNo }}
            </div>
          </el-descriptions-item>
          <!-- Buyer -->
          <el-descriptions-item :span="2">
            <template slot="label">
              <div class="item-label">Buyer</div>
            </template>
            <div class="item-label">
              {{ orderInfo.orderDetails.buyer }}
            </div>
          </el-descriptions-item>
          <!-- Seller -->
          <el-descriptions-item :span="2">
            <template slot="label">
              <div class="item-label">Seller</div>
            </template>
            <div class="item-label">
              {{ orderInfo.orderDetails.seller }}
            </div>
          </el-descriptions-item>
          <!-- Seller Evaluation -->
          <el-descriptions-item :span="2" v-if="step == 5">
            <template slot="label">
              <div class="item-label">Seller Evaluation</div>
            </template>
            <div class="item-label">
              {{ orderInfo.evaluation.seller }}
            </div>
          </el-descriptions-item>
          <!-- Buyer Evaluation -->
          <el-descriptions-item :span="2" v-if="step == 5">
            <template slot="label">
              <div class="item-label">Buyer Evaluation</div>
            </template>
            <div class="item-label">
              {{ orderInfo.evaluation.buyer }}
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </el-container>

      <!--Delivery Address-->
      <el-container style="margin-top: 20px">
        <el-descriptions :column="6" style="width: 100%" border>
          <template slot="title">
            Delivery Address
            <el-button
              v-if="showModule.addressSelectButton"
              type="primary"
              size="small"
              @click="setDeliveryAddressIsShow = true"
              >Select</el-button
            >
          </template>
          <el-descriptions-item
            :span="2"
            v-if="orderInfo.delivery.address.name != ''"
          >
            <template slot="label">
              <div class="item-label">Name</div>
            </template>
            {{ orderInfo.delivery.address.name }}
          </el-descriptions-item>
          <el-descriptions-item
            :span="2"
            v-if="orderInfo.delivery.address.phoneNo != ''"
          >
            <template slot="label">
              <div class="item-label">Phone No.</div>
            </template>
            {{ orderInfo.delivery.address.phoneNo }}
          </el-descriptions-item>
          <el-descriptions-item
            :span="2"
            v-if="orderInfo.delivery.address.address != ''"
          >
            <template slot="label">
              <div class="item-label">Delivery Address</div>
            </template>
            {{ orderInfo.delivery.address.address }}
          </el-descriptions-item>
          <el-descriptions-item v-if="showModule.deliveryInfo" :span="2">
            <template slot="label">
              <div class="item-label">Delivery Time</div>
            </template>
            {{ orderInfo.delivery.trackingInfo.deliveryTime }}
          </el-descriptions-item>
          <el-descriptions-item v-if="showModule.deliveryInfo" :span="2">
            <template slot="label">
              <div class="item-label">Delivery Company</div>
            </template>
            {{ orderInfo.delivery.trackingInfo.deliveryCompany }}
          </el-descriptions-item>
          <el-descriptions-item v-if="showModule.deliveryInfo" :span="2">
            <template slot="label">
              <div class="item-label">Tracking No.</div>
            </template>
            {{ orderInfo.delivery.trackingInfo.trackingNo }}
          </el-descriptions-item>
        </el-descriptions>
      </el-container>

      <!-- Item Details -->
      <el-container>
        <div>
          <el-row>
            <el-col :span="4">
              <div>
                <el-image
                  :src="itemDetails.pic[0]"
                  fit="cover"
                  :preview-src-list="itemDetails.pic"
                >
                </el-image>
              </div>
            </el-col>
            <el-col :span="18">
              <h3 style="margin-bottom: 10px; margin-top: 0px">
                {{ itemDetails.itemTitle }}
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
                    {{ buttonName.button1 }}
                  </el-button>
                  <el-button
                    v-if="buttonName.button2 != ''"
                    type="danger"
                    @click="button2Click"
                    :loading="buttonLoading.button2"
                  >
                    {{ buttonName.button2 }}
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-container>

      <el-container> </el-container>

      <!-- Choose Delivery Address -->
      <el-dialog
        title="Choose a Delivery Address"
        :visible.sync="setDeliveryAddressIsShow"
      >
        <el-table
          :data="
            addressData.filter(
              (data) =>
                !search ||
                data.address.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
          max-height="1000"
        >
          <el-table-column label="Name" prop="name" width="150" fixed="">
          </el-table-column>
          <el-table-column label="Phone No." prop="phoneNo" width="150">
          </el-table-column>
          <el-table-column label="Delivery Address" prop="address">
          </el-table-column>
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

      <!-- Set Delivery Info -->
      <el-dialog
        title="Set Delivery Info"
        :visible.sync="setDeliveryInfoIsShow"
      >
        <el-form :model="orderInfo.delivery.trackingInfo">
          <el-form-item label="Delivery Company" label-width="160px">
            <el-input
              v-model="orderInfo.delivery.trackingInfo.deliveryCompany"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="Tracking No" label-width="160px">
            <el-input
              v-model="orderInfo.delivery.trackingInfo.trackingNo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="setDeliveryInfoIsShow = false">Cancel</el-button>
          <el-button type="primary" @click="onClickDelivery"
            >Confirm</el-button
          >
        </div>
      </el-dialog>

      <!-- Test Button -->
      <el-button type="primary" @click="stepInc">+</el-button>
      <el-button type="success" @click="stepDes">-</el-button>
    </div>
    <el-empty v-if="!showAll" description="ERROR"></el-empty>
  </div>
</template>

<style scoped>
.text {
  font-size: 14px;
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
      showAll: true,
      orderInfo: {
        orderStatus: "",
        orderDetails: {
          orderNo: "",
          buyer: "",
          seller: "",
        },
        payment: {
          paymentNo: "",
          paymentMethod: "",
        },
        evaluation: {
          buyer: "",
          seller: "",
        },
        delivery: {
          address: {
            name: "",
            phoneNo: "",
            address: "",
          },
          trackingInfo: {
            deliveryTime: "",
            deliveryCompany: "",
            trackingNo: "",
          },
        },
      },
      itemDetails: {
        itemId: 0,
        itemTitle: "",
        pic: [],
      },
      addressData: [
        {
          name: "Zekizheng",
          phoneNo: "1806000000",
          address:
            "Jalan Sunsuria, Bandar Sunsuria, 43900 Sepang, Selangor Darul Ehsan, Malaysia",
        },
        {
          name: "Test",
          phoneNo: "11111",
          address:
            "Jalan Sunsuria, TEST AREA Bandar Sunsuria, 43900 Sepang, Selangor Darul Ehsan, Malaysia",
        },
      ],
      showModule: {
        addressSelectButton: true,
        deliveryInfo: false,
      },
      buttonName: {
        button1: "Create",
        button2: "Cancel",
      },
      stepStatus: {
        Paid: "",
        Delivery: "",
        Confirm: "",
      },
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
      elStep: 0,
      search: "",
      setDeliveryAddressIsShow: false,
      setDeliveryInfoIsShow: false,
      formLabelWidth: "120px",
      remark: "",
      step: 0,
      textIsReadOnly: false,
      buttonLoading: {
        button1: false,
        button2: false,
      },
    };
  },
  methods: {
    selectAddress(index, row) {
      console.log("select address");
      console.log(index, row);
      this.orderInfo.delivery.address.name = row.name;
      this.orderInfo.delivery.address.phoneNo = row.phoneNo;
      this.orderInfo.delivery.address.address = row.address;
      this.setDeliveryAddressIsShow = false;
      this.$message({
        message: "Set address successfully!",
        type: "success",
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
    button1Click() {
      var that = this;
      console.log(this.step);
      if (this.step == 0) {
        if (this.orderInfo.delivery.address.phoneNo == "") {
          this.$message({
            message: "You haven't selected delivery address!",
            type: "warning",
          });
        } else {
          var order = this.orderInfo;
          //can create order
          var sendData = {};
          sendData["itemId"] = this.$route.query.id;
          sendData["buyerId"] = "SWE1809388";
          sendData["deliveryInfo"] = this.orderInfo.delivery.address;
          sendData["remark"] = this.remark;
          this.axios
            .post("http://localhost:8081/order/createOrder", sendData)
            .then((resp) => {
              console.log(resp);
              if (resp.data.code == 0) {
                var respData = resp.data.data;
                that.step = 1;
                order.orderStatus = respData.orderStatus;
                order.orderDetails.orderNo = respData.orderId;
                order.orderDetails.buyer = respData.buyerId;
                order.orderDetails.seller = respData.sellerId;
                that.remark = respData.remark;
                that.itemDetails.itemId = respData.itemId;
                order.delivery.address = respData.deliveryInfo
                that.axios
                  .get("http://localhost:8081/item/queryOneItem", {
                    params: { itemId: this.itemDetails.itemId },
                  })
                  .then((resp) => {
                    var respData = resp.data.data;
                    console.log(respData);
                    that.itemDetails.itemTitle = respData.itemTitle;
                    that.itemDetails.pic = respData.itemImage;
                  });
                that.$message({
                  message: "Create order successfully",
                  type: "success",
                });
                that.$router.push({
                  path: "/Order/Details",
                  query: {
                    orderId: respData.orderId,
                  },
                });
              } else {
                that.$alert(
                  resp.data.description,
                  resp.data.message + ": Create Order Fail",
                  {
                    confirmButtonText: "OK",
                    callback: (action) => {
                      console.log("OK");
                    },
                  }
                );
              }
            });
        }
      }
      if (this.step == 2) {
        this.setDeliveryInfoIsShow = true;
      }
      if (this.step == 3) {
        console.log("confirm")
        var sendData = {}
        const that = this
        sendData['orderId'] = this.orderInfo.orderDetails.orderNo
        this.axios.post("http://localhost:8081/order/onConfirm", sendData)
                  .then(resp => {
                    console.log(resp)
                    if(resp.data.code === 0) {
                      that.step++
                      this.$message.success("Success to confirm this order!")
                    } else {
                      this.$message.error(resp.data.message + ": "+ resp.data.description)
                    }
                  })
                  .catch(err => {
                    this.$message.error("UNKNOWN ERROR!")
                  })
      }
      if (this.step == 4) {
        const that = this
        this.$prompt('Give evaluation', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        }).then(({ value }) => {
          var sendData = {}
          sendData['orderId'] = that.orderInfo.orderDetails.orderNo
          sendData['sellerEvaluation'] = value
          that.axios.post("http://localhost:8081/order/giveEvaluation", sendData)
                    .then(resp => {
                      console.log(resp)
                      if(resp.data.code == 0) {
                        that.step++
                        if(resp.data.data.sellerEvaluation != null) {
                          that.orderDetails.evaluation.seller = resp.data.data.sellerEvaluation
                        }

                        if(resp.data.data.buyerEvaluation != null) {
                          that.orderDetails.evaluation.buyer = resp.data.data.buyerEvaluation
                        }

                        this.$message({
                          type: 'success',
                          message: 'success to set evaluation!'
                        });
                      }else {
                        this.$message.error(resp.data.message + " : " + resp.data.description )
                      }

                    })

        }).catch((err) => {
          console.log(err)
          this.$message.warning("You cancel to give evaluation!")
        });
      }
    },
    button2Click() {
      console.log("Button 2 Click");
    },
    onClickDelivery() {
      var sendData = {};
      sendData['orderId'] = this.$route.query.orderId
      sendData['deliveryCompany'] = this.orderInfo.delivery.trackingInfo.deliveryCompany
      sendData['trackingNo'] = this.orderInfo.delivery.trackingInfo.trackingNo
      console.log(sendData)
      var that = this
      this.axios.post("http://localhost:8081/order/setDelivery", sendData)
                .then(resp => {
                  console.log(resp)
                  if(resp.data.code === 0) {
                    const respData = resp.data.data;
                    that.step = 3
                    that.orderInfo.delivery.trackingInfo.deliveryCompany = respData.deliveryCompany
                    that.orderInfo.delivery.trackingInfo.trackingNo = respData.trackingNo
                    that.orderInfo.delivery.trackingInfo.deliveryTime = respData.deliveryTime
                    this.$message({
                      message: "Set delivery successfully!",
                      type: "success",
                    });
                  } else {
                    this.$message({
                      message: "Set delivery failed!\nReason: " + resp.data.description,
                      type: "warning",
                    });
                  }
                })
                .catch(err => {
                  this.$message({
                    message: "Set delivery failed!\nReason: UNKNOWN ERROR",
                    type: "warning",
                  });
                })
      this.setDeliveryInfoIsShow = false
    }
  },
  watch: {
    step() {
      switch (this.step) {
        case 0: //just create
          this.elStep = 0;
          this.showModule.addressSelectButton = true;
          this.showModule.deliveryInfo = false;
          this.textIsReadOnly = false;
          this.buttonName.button1 = "Create";
          this.buttonName.button2 = "Cancel";
          break;
        case 1: //created
          this.elStep = 1;
          this.showModule.addressSelectButton = true;
          this.showModule.deliveryInfo = false;
          this.textIsReadOnly = true;
          this.buttonName.button1 = "Pay";
          this.buttonName.button2 = "Cancel Order";
          console.log(1);
          break;
        case 2: //paid
          this.elStep = 2;
          this.showModule.addressSelectButton = false;
          this.showModule.deliveryInfo = false;
          this.textIsReadOnly = true;
          this.buttonName.button1 = "Set Delivery Info";
          this.buttonName.button2 = "Cancel Order";
          break;
        case 3:
          this.elStep = 3;
          this.showModule.addressSelectButton = false;
          this.showModule.deliveryInfo = true;
          this.textIsReadOnly = true;
          this.buttonName.button1 = "Confirm Order";
          this.buttonName.button2 = "Apply Refund";
          break;
        case 4:
          this.elStep = 4;
          this.showModule.addressSelectButton = false;
          this.showModule.deliveryInfo = true;
          this.textIsReadOnly = true;
          this.buttonName.button1 = "Give Evalutaion";
          this.buttonName.button2 = "";
          break;
        case 5:
          this.elStep = 5;
          this.showModule.addressSelectButton = false;
          this.showModule.deliveryInfo = true;
          this.textIsReadOnly = true;
          this.buttonName.button1 = "";
          this.buttonName.button2 = "";
          break;
        default:
          console.log(this.step);
          break;
      }
      console.log(this.step);
    },
  },
  async created() {
    var that = this;
    if (this.$route.path == "/Order/Details") {
      var order = this.orderInfo;
      console.log(this.$route.query.orderId);
      if (
        this.$route.query.orderId == "" ||
        this.$route.query.orderId == null
      ) {
        this.showAll = false;
        await this.$alert("Order not exist!", "Error", {
          confirmButtonText: "OK",
          callback: (action) => {
            that.$router.push({
              path: "/",
            });
          },
        });
        return;
      }
      await this.axios
        .get("http://localhost:8081/order/queryOrder", {
          params: { orderId: this.$route.query.orderId },
        })
        .then((resp) => {
          var respData = resp.data.data;
          if (resp.data.code == 0) {
            switch (respData.orderStatus) {
              case "CREATED":
                that.step = 1;
                order.orderStatus = respData.orderStatus;
                order.orderDetails.orderNo = respData.orderId;
                order.orderDetails.buyer = respData.buyerId;
                order.orderDetails.seller = respData.sellerId;
                that.remark = respData.remark;
                that.itemDetails.itemId = respData.itemId;
                break;
              case "PAID":
                that.step = 2;
                order.orderStatus = respData.orderStatus;
                order.orderDetails.orderNo = respData.orderId;
                order.orderDetails.buyer = respData.buyerId;
                order.orderDetails.seller = respData.sellerId;
                order.payment.paymentNo = respData.payNo;
                order.payment.paymentMethod = "Balance";
                that.remark = respData.remark;
                that.itemDetails.itemId = respData.itemId;
                order.delivery.address = respData.deliveryInfo
                break;
              case "ON_DELIVERY":
                that.step = 3;
                order.orderStatus = respData.orderStatus;
                order.orderDetails.orderNo = respData.orderId;
                order.orderDetails.buyer = respData.buyerId;
                order.orderDetails.seller = respData.sellerId;
                order.payment.paymentNo = respData.payNo;
                order.payment.paymentMethod = "Balance";
                that.remark = respData.remark;
                that.itemDetails.itemId = respData.itemId;
                order.delivery.address = respData.deliveryInfo
                that.orderInfo.delivery.trackingInfo.deliveryCompany = respData.deliveryCompany
                that.orderInfo.delivery.trackingInfo.trackingNo = respData.trackingNo
                that.orderInfo.delivery.trackingInfo.deliveryTime = respData.deliveryTime
                break;
              case "ON_RECEIVED":
                that.step = 4;
                order.orderStatus = respData.orderStatus;
                order.orderDetails.orderNo = respData.orderId;
                order.orderDetails.buyer = respData.buyerId;
                order.orderDetails.seller = respData.sellerId;
                order.payment.paymentNo = respData.payNo;
                order.payment.paymentMethod = "Balance";
                that.remark = respData.remark;
                that.itemDetails.itemId = respData.itemId;
                order.delivery.address = respData.deliveryInfo
                that.orderInfo.delivery.trackingInfo.deliveryCompany = respData.deliveryCompany
                that.orderInfo.delivery.trackingInfo.trackingNo = respData.trackingNo
                that.orderInfo.delivery.trackingInfo.deliveryTime = respData.deliveryTime
                  if(respData.sellerEvaluation != null) {
                    that.orderInfo.evaluation.seller = respData.sellerEvaluation
                  } else if (respData.buyerEvaluation != null){
                    that.orderInfo.evaluation.buyer = respData.buyerEvaluation
                  }
                break;
                  case "FINISH":
                    that.step = 5;
                    order.orderStatus = respData.orderStatus;
                    order.orderDetails.orderNo = respData.orderId;
                    order.orderDetails.buyer = respData.buyerId;
                    order.orderDetails.seller = respData.sellerId;
                    order.payment.paymentNo = respData.payNo;
                    order.payment.paymentMethod = "Balance";
                    that.remark = respData.remark;
                    that.itemDetails.itemId = respData.itemId;
                    order.delivery.address = respData.deliveryInfo
                    that.orderInfo.delivery.trackingInfo.deliveryCompany = respData.deliveryCompany
                    that.orderInfo.delivery.trackingInfo.trackingNo = respData.trackingNo
                    that.orderInfo.delivery.trackingInfo.deliveryTime = respData.deliveryTime
                      that.orderInfo.evaluation.seller = respData.sellerEvaluation
                      that.orderInfo.evaluation.buyer = respData.buyerEvaluation
                    break;
            }
          } else {
            that.showAll = false;
            that.$alert(resp.data.description, resp.data.message, {
              confirmButtonText: "OK",
              callback: (action) => {
                that.$router.push({
                  path: "/",
                });
              },
            });
          }
          console.log(respData);
        })
        .catch((err) => {
          that.showAll = false;
          that.$alert(resp.data.description, resp.data.message, {
            confirmButtonText: "OK",
            callback: (action) => {
              that.$router.push({
                path: "/",
              });
            },
          });
        });
      if (this.itemDetails.itemId == "") {
        return;
      }
      await this.axios
        .get("http://localhost:8081/item/queryOneItem", {
          params: { itemId: this.itemDetails.itemId },
        })
        .then((resp) => {
          var respData = resp.data.data;
          console.log(respData);
          that.itemDetails.itemTitle = respData.itemTitle;
          that.itemDetails.pic = respData.itemImage;
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.$route.path == "/Order/Create") {
      if (this.$route.query.id == "" || this.$route.query.id == null) {
        that.showAll = false;
        this.$alert("Order not exist!", "Error", {
          confirmButtonText: "OK",
          callback: (action) => {
            that.$router.push({
              path: "/",
            });
          },
        });
        return;
      }
      this.step = 0;
      await this.axios
        .get("http://localhost:8081/item/queryOneItem", {
          params: { itemId: this.$route.query.id },
        })
        .then((resp) => {
          if (resp.data.code == 0) {
            var respData = resp.data.data;
            console.log(respData);
            that.itemDetails.itemTitle = respData.itemTitle;
            that.itemDetails.pic = respData.itemImage;
            if (respData.itemStatus == "SOLD") {
              that.showAll = false;
              this.$alert("This item has sold!", "Error", {
                confirmButtonText: "OK",
                callback: (action) => {
                  that.$router.push({
                    path: "/ItemDetail",
                    query: {
                      id: this.$route.query.id,
                    },
                  });
                },
              });
              return;
            }
          } else {
            that.showAll = false;
            this.$alert(resp.data.description, resp.data.message, {
              confirmButtonText: "OK",
              callback: (action) => {
                that.$router.push({
                  path: "/",
                });
              },
            });
          }
        });
    }
  },
};
</script>
