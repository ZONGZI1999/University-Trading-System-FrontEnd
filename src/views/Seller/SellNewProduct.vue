<template>
    <div>
        <!-- Item Details -->
        <el-container >
        <div style="width: 100%">
            <el-row>
            <el-col :span="4">
                <el-image
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="cover"
                    :preview-src-list="picList"
                ></el-image>
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
                style="width: 300px">
                  <template slot="prepend">Price</template>
                </el-input>
              </el-container>
                <el-container>
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleChange"
                    :file-list="fileList">
                    <el-button size="small" type="primary">Upload Photo</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-container>
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
        <el-container >
          <el-form :inline="true" >
            <el-form-item label="Description" >
              <el-input v-model="desc" placeholder="Please Enter Description" type="textarea" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addDesc">Add</el-button>
            </el-form-item>
          </el-form>
        </el-container>
        <el-container style="margin-top: 0px">
          <el-empty v-if="descriptions.length == 0" style="margin: 0 auto" description="No descriptions. Please Add."></el-empty>
          <table>
          <ul style="line-height: 25px">
            <tr v-for="(each, index) in descriptions" :key="index">
              <td>
              <li>{{each}}
              </li>
              </td>
              <td style="width: 140px; text-align:center;">
                <el-link v-if="index != 0" type="primary" @click="upOrDownDesc(index,-1)" style="margin-right: 5px">Up</el-link>
                <el-link v-if='index+1 != descriptions.length' @click="upOrDownDesc(index,+1)" type="primary" style="margin-right: 5px" >Down</el-link>
                <el-popconfirm
                  title="Are you sure to remove this description?"
                  @confirm='deleteDesc(index)'
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
            <el-button type="primary">Submit</el-button>
            <el-button type="danger">Cancel</el-button>
          </div>
        </el-container>
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
        picList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        desc: '',
        title: '',
        price: '',
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        descriptions: [
          '【brushed Microfiber Made】 4-piece Size Twin Bed Sheet Set: 2 Pillow Cases and a Top Sheet and Fitted Sheet. Top Sheet Fitted Sheet 2 Pillow Cases (20” X 30”). Spaceship Rockets Print Kids Bedding',
          '【KFZ COSMIC PLANET PRINTED BEDDING】 The Bed Sheet Sets include 1 Flat Sheet, 1 Fitted Sheet, and 2 Pillow Cases Twin Sheets Set Blue Color for Girls Kids Adults',
          '【TOP-GRADE MATERIAL】This polyester brushed microfiber fabric girls bed sheet set is super silky soft, luxuriously comfortable, and wholly breathable for all-season use. The Egyptian-quality fiber ensures that the full sheets sets are resistant to wrinkles, stains, and fading. Even more skin-friendly than 100% cotton sheets, these full bed sheets will keep you fresh and cool in summer and cozy-warm in winter. The top sheet is also suitable for use as a coverlet on summer days.',
          '【DEEP-POCKET SHEET SETS】The fitted bed sheet included is designed with a deep pocket, allowing it to comfortably fit any mattress less than 15” in thickness. With a matching pattern on the top flat sheet and European envelope-style pillowcases, you can easily upgrade your bedding with a distinctive style in no time at all. The bedding sets are 100% soft, meaning they are for kids.',
          '【CUTE DESIGN AND GENEROUS FITS】Our twin size sheets are designed with very realistic solar planets on navy blue background pattern. We included all the planets in solar system. It is suitable for use in any type of room, including in the bedroom, as kids’ room décor, especially for the little ones who are keen on astronomical science. The cool and fashionable design is a delightful and colorful addition to your home décor.'
        ]
      }
    },
    methods: {
      handleChange(file, fileList) {
        console.log(fileList);
        this.fileList = fileList.slice(-3);
      },
      addDesc(){
        this.descriptions.push(this.desc)
        this.desc = ''
      },
      deleteDesc(index){
        console.log("remove: " + index);
        this.descriptions.splice(index, 1)
      },
      upOrDownDesc(index, upOrDown){
        console.log("up" + index);
        var cur = this.descriptions[index]
        this.descriptions.splice(index, 1)
        this.descriptions.splice(index+upOrDown, 0, cur)
      }
    }
  }
</script>