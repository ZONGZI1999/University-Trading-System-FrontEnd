<template>
  <div id="app">
    <el-container>
      <div>
        <el-row
          :gutter="18"
          style="padding-top: 20px; padding-bottom: 10px; padding-left: 20%"
        >
          <el-col :span="9">
            <el-image
            style="width: 300px; height: 100px"
            :src="imgUrl"
            fit="fill"></el-image>
          </el-col>
          <el-col :span="9" >
            <el-container>
                <el-input placeholder="Please Enter Keywords" v-model="searchKeyword" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-container>
          </el-col>
        </el-row>
        <el-header style="padding: 0px;">
          <el-menu
            :default-active="activeIndex2"
            :router="true"
            class="el-menu-demo action"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item 
              index="1"
              route="/">
              Home Page
            </el-menu-item>
            <el-menu-item 
              index="2"
              route="/My">
              My Center
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">Seller Center</template>
              <el-menu-item 
                index="3-1"
                route="/ItemList"
                >
                Selling List
              </el-menu-item>
              <el-menu-item
                index="3-2"
                route="/OrderList"
                >
                Order List
              </el-menu-item>
              <el-menu-item
                index="3-3"
                route="/SellNewProduct"
                >
                Post New Product
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">Buyer Center</template>
              <el-menu-item 
                index="4-1"
                route="/OrderList"
                >
                Order List
              </el-menu-item>
              <el-menu-item
                index="4-2"
                route="/SellNewProduct"
                >
                Management Delivery Address
              </el-menu-item>
            </el-submenu>
                        <el-menu-item 
              index="5"
              route="/Login">
              Login
            </el-menu-item>
          </el-menu>
        </el-header>
      </div>

      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <div style="text-align: center">
          (C) Copyright All Right Reserved. 2021 University Trading System
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      searchKeyword: '',
      imgUrl: require("./assets/logo.png")
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.action {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
