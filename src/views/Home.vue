<template>
  <div>
    <!-- Img -->
    <div>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <img
            src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            style="height: 100%; width: 100%"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row >
      <!-- New For Sell -->
      <el-col>
          <h1 style="text-align: center">New For Sell</h1>
      </el-col>
      <el-col :span="4" v-for="(item, index) in showList" :key="index">
        <el-card style="margin: 5px" :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.price }}</time>
              <el-button type="text" class="button">View</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col style="margin-top: 10px">
        <el-container>
          <div style="margin: 0 auto">
            <el-pagination
              :hide-on-single-page="true"
              :total="showItem.length"
              :page-size="6"
              layout="prev, pager, next"
              @current-change="pageChange"
            >
            </el-pagination>
          </div>
        </el-container>
      </el-col>      
    </el-row>
    <el-row >
      <!-- HOT -->
      <el-col>
          <h1 style="text-align: center">HOT</h1>
      </el-col>
      <el-col :span="4" v-for="(item, index) in showList" :key="index">
        <el-card style="margin: 5px" :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.price }}</time>
              <el-button type="text" class="button">View</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col style="margin-top: 10px">
        <el-container>
          <div style="margin: 0 auto">
            <el-pagination
              :hide-on-single-page="true"
              :total="showItem.length"
              :page-size="6"
              layout="prev, pager, next"
              @current-change="pageChange"
            >
            </el-pagination>
          </div>
        </el-container>
      </el-col>      
    </el-row>
    <el-divider>END</el-divider>
  </div>
</template>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

<script>
export default {
  data() {
    return {
      showItem: [],
      showList: []
    };
  },
  methods: {
    pageChange(page){
        //$('html, body').animate({scrollTop:0}, 400); //Scroll to Top
        this.showList = []
        for(var i = (page-1)*6; i < page*6 && i < this.showItem.length; i++){
            this.showList.push(this.showItem[i])
        }
    }
  },
  created() {
    for (var i = 0; i < 11; i++) {
      var addVar = {
        title: "Test",
        price: "$ "+ i + ".00",
      };
      this.showItem.push(addVar);
    }

    this.showList = []
    for(var i = 0; i < 6 && i < this.showItem.length; i++){
        this.showList.push(this.showItem[i])
    }
  },
};
</script>