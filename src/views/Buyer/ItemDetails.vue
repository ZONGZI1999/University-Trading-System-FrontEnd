<template>
    <div>
      <div v-if="err_msg === ''">
        <el-container>
          <div>
            <el-row type="flex">
              <el-col :span="12">
                <div class="block">
                  <span class="demonstration"></span>
                  <el-image
                      :src="picList[0]"
                      fit="cover"
                      :preview-src-list="picList"
                  >
                    <template slot="error">
                      <div style="text-align: center;">
                        <img :src="errPath"  alt="100px"/> <br />
                        NO IMAGE GIVEN
                      </div>
                    </template>
                  </el-image>
                </div>
              </el-col>
              <el-col :span="12">
                <h3 style="margin-bottom: 10px; margin-top: 0px">
                  {{(itemStatus != 'ON_SELL'?"[" + itemStatus+"] " :"")+ title}}
                </h3>
                <!-- Seller -->
                <el-popover
                    placement="right"
                    width="400"
                    trigger="hover">
                  {{seller}}@xmu.edu.my
                  <div style="display: table;" slot="reference">
                    <b>Seller: &emsp;</b>
                    <div style="display: table-cell;vertical-align: middle;" class="sub-title">{{sellerName}}</div>
                  </div>
                </el-popover>

                <div class="price-title">
                  $ {{price}}
                </div>
<!--                <el-tooltip class="item" effect="dark" content="Star" placement="bottom">-->
<!--                  <el-button type="warning" icon="el-icon-star-off" circle></el-button>-->
<!--                </el-tooltip>-->
<!--                <el-tooltip class="item" effect="dark" content="Add to Shopping Cart" placement="bottom">-->
<!--                  <el-button type="info" icon="el-icon-shopping-cart-2" circle></el-button>-->
<!--                </el-tooltip>-->
                <el-tooltip class="item" effect="dark" :content="'Chat with Seller: ' + seller + '@xmu.edu.my'" placement="bottom">
                  <el-button type="primary" icon="el-icon-chat-line-round" circle></el-button>
                </el-tooltip>
                <el-button  :disabled="itemStatus == 'SOLD'" type="success"  round @click="buyClick">Buy</el-button>
              </el-col>
            </el-row>
          </div>
        </el-container>

        <el-container>
          <h2>
            Product Description
          </h2>
        </el-container>
        <!-- Desc -->
        <el-container style="margin-top: 0px">
          <ul style="line-height: 25px">
            <li v-for="(des, index) in desc" :key="index">{{des}}</li>
          </ul>
        </el-container>
      </div>
      <el-empty v-if="err_msg !== ''" :description="err_msg"></el-empty>
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
  font-size: 15px;
  color: #8492a6;
}

.price-title {
  margin-top: 20px;
  margin-bottom: 20px;
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
        picList: [
        ],
        desc: [
          
        ],
        err_msg: "",
        title: "",
        price: "",
        sellerName: "",
        seller: "",
        itemId: 0,
        itemStatus: "",
        errPath: require("@/assets/forbidden.png")
      }
    },
    methods:{
      buyClick(){
              this.$router.push({
        path: "/Order/Create",
        query: {
          id: this.itemId,
        },
      });
      }
    },
     created(){
      var that = this
      this.itemId = this.$route.query.id
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      console.log(this.$route.query.id);
      this.axios.get("http://localhost:8081/item/queryOneItem", {params:{itemId: this.$route.query.id}})
                      .then(resp => {
                        loading.close()
                        if (resp.data.code === 0) {
                          var respData = resp.data.data
                          that.desc = respData.itemDescription
                          that.picList = respData.itemImage
                          that.title = respData.itemTitle
                          that.price = (respData.itemPrice) / 100.00
                          that.seller = respData.sellerId
                          this.axios.get('http://localhost:8081/student/getByStudentId', {params:{studentId: respData.sellerId}})
                              .then(resp => {
                                console.log(resp)
                                if (resp.data.code === 0) {
                                  that.sellerName = resp.data.data.studentName
                                }
                              })
                          that.itemStatus = respData.itemStatus
                          console.log(that.picList);
                        }else {
                          this.$message.error(resp.data.message + ": " + resp.data.description)
                          this.err_msg = resp.data.message + ": " + resp.data.description
                        }

                      })
                      .catch(err=> {
                        this.err_msg = "Internal Error!"
                        console.log(err)
                      })
    }
  }
</script>