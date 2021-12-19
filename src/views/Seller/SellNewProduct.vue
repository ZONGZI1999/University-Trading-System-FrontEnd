<template>
  <div>
    <div v-if="errDesc === ''">
      <!-- Item Details -->
      <el-container>
        <div style="width: 100%">
          <el-row>
            <el-col :span="4">
              <el-image
                  :src="imageURL[0]"
                  fit="cover"
                  :preview-src-list="imageURL"
              >
                <template slot="error">
                  <div style="text-align: center;">
                    <img :src="errPath" alt="100px"/> <br/>
                    Please Upload Image
                  </div>
                </template>
              </el-image>
            </el-col>
            <el-col :span="18">
              <el-container>
                <el-input
                    placeholder="Please Enter Product Title"
                    v-model="title"
                >
                  <template slot="prepend">Title</template>
                </el-input>
              </el-container>
              <el-container>
                <el-input
                    v-model="price"
                    placeholder="Please Enter Product Price"
                    style="width: 300px"
                >
                  <template slot="prepend">Price</template>
                </el-input>
              </el-container>
              <el-container>
                <el-upload
                    class="upload-demo"
                    action="http://localhost:8081/upload"
                    :headers="headersToUpload"
                    :on-change="handleChange"
                    name="multipartFile"
                    :file-list="fileList"
                    :on-success="successUpload"
                    :on-remove="onRemove"
                >
                  <el-button size="small" type="primary">Upload Photo</el-button>
                  <div slot="tip" class="el-upload__tip">
                    Only can upload JPG/PNG file.
                  </div>
                </el-upload>
              </el-container>
            </el-col>
          </el-row>
        </div>
      </el-container>

      <el-container>
        <h2>Product Description</h2>
      </el-container>
      <!-- Desc -->
      <el-container>
        <el-form :inline="true">
          <el-form-item label="Description">
            <el-input
                v-model="desc"
                placeholder="Please Enter Description"
                type="textarea"
                style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addDesc">Add</el-button>
          </el-form-item>
        </el-form>
      </el-container>
      <el-container style="margin-top: 0px">
        <el-empty
            v-if="descriptions.length == 0"
            style="margin: 0 auto"
            description="No descriptions. Please Add."
        ></el-empty>
        <table>
          <ul style="line-height: 25px">
            <tr v-for="(each, index) in descriptions" :key="index">
              <td>
                <li>{{ each }}</li>
              </td>
              <td style="width: 140px; text-align: center">
                <el-link
                    v-if="index != 0"
                    type="primary"
                    @click="upOrDownDesc(index, -1)"
                    style="margin-right: 5px"
                >Up
                </el-link
                >
                <el-link
                    v-if="index + 1 != descriptions.length"
                    @click="upOrDownDesc(index, +1)"
                    type="primary"
                    style="margin-right: 5px"
                >Down
                </el-link
                >
                <el-popconfirm
                    title="Are you sure to remove this description?"
                    @confirm="deleteDesc(index)"
                >
                  <el-link type="danger" slot="reference">Remove</el-link>
                </el-popconfirm>
              </td>
            </tr>
          </ul>
        </table>
      </el-container>
      <el-container>
        <div style="margin: 0 auto">
          <el-button type="primary" @click="postNewOne">Submit</el-button>
          <el-button type="danger">Cancel</el-button>
        </div>
      </el-container>
    </div>
    <el-empty v-if="errDesc!==''" :description="errDesc"></el-empty>
  </div>
</template>

<style scoped>
.text {
  font-size: 14px;
}

.el-container {
  margin-top: 20px;
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
      mode: "NEW",
      headersToUpload: {},
      errDesc: "",
      desc: "",
      title: "",
      price: "",
      fileList: [],
      imageURL: [],
      descriptions: [],
      errPath: require("@/assets/forbidden.png")
    };
  },
  methods: {
    successUpload(response, file, fileList) {
      console.log("SUCCESS", response, file, fileList)
      this.imageURL.push("http://localhost:8081/download?fileName=" + response.filePath)
    },
    onRemove(file, fileList) {
      console.log("REMOVE", file, fileList)
      for (var index = 0; index < this.imageURL.length; index++) {
        if (this.imageURL[index] == 'http://localhost:8081/download?fileName=' + file.response.filePath) {
          this.imageURL.splice(index, 1)
          break;
        }
      }
    },
    handleChange(file, fileList) {
      console.log("file", file)
      console.log("file list", fileList)
      // this.imageURL.push("http://localhost:8081/download?fileName=" + this.file.name)
    },
    addDesc() {
      this.descriptions.push(this.desc);
      this.desc = "";
    },
    deleteDesc(index) {
      console.log("remove: " + index);
      this.descriptions.splice(index, 1);
    },
    upOrDownDesc(index, upOrDown) {
      console.log("up" + index);
      var cur = this.descriptions[index];
      this.descriptions.splice(index, 1);
      this.descriptions.splice(index + upOrDown, 0, cur);
    },
    postNewOne() {
      var that = this;
      console.log("post new one");
      console.log();
      var image = this.imageURL;
      var isNum = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if (!isNum.test(this.price + "")) {
        this.$message.error("Price Format is error!")
        return;
      }
      var sendData = {
        itemTitle: this.title,
        itemPrice: Math.round(Number(this.price) * 100) + "",
        itemDescription: this.descriptions,
        itemImage: image,
      };
      console.log("POST", sendData);
      var URL = "http://localhost:8081/item/postNewItem"
      if (this.mode == "UPDATE") {
        URL = "http://localhost:8081/item/updateItem"
        sendData['itemId'] = this.$route.query.id
      }
      this.axios
          .post(URL, sendData)
          .then((resp) => {
            if (resp.data.code == 0) {
              var id = resp.data.data.itemId
              that.$alert("Successfully Post!", "Notice", {
                confirmButtonText: "View It",
                callback: (action) => {
                  console.log("OK");
                  that.$router.push({
                    path: "/ItemDetail",
                    query: {
                      id: id,
                    },
                  });
                },
              });
            } else {
              that.$alert(resp.data.description, resp.data.message, {
                confirmButtonText: "OK",
                callback: (action) => {
                },
              });
            }
            console.log(resp);

          });
    },
  },
  created() {
    this.headersToUpload = {"trading-token": localStorage.getItem("trading-token")}
    if (this.$route.path == '/EditProductInfo') {
      var that = this
      this.mode = "UPDATE"
      this.axios.get("http://localhost:8081/item/queryOneItem", {params: {itemId: this.$route.query.id}})
          .then(resp => {
            if (resp.data.code == 0) {
              if (resp.data.data.itemStatus !== "ON_SELL") {
                this.errDesc = "This item is SOLD, you cannot modify it!"
                return;
              }
              console.log(resp)
              var respData = resp.data.data
              that.title = respData.itemTitle
              that.price = respData.itemPrice / 100.00
              that.descriptions = respData.itemDescription
              that.imageURL = respData.itemImage
            } else {
              this.$message.error(resp.data.message + ": " + resp.data.description)
              this.errDesc = resp.data.message + ": " + resp.data.description
            }

          })
    }
  }
};
</script>