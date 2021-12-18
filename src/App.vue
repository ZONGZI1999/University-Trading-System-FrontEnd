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
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
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
                route="/SellerOrderList"
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
                route="/BuyerOrderList"
                >
                Order List
              </el-menu-item>
            </el-submenu>
                        <el-menu-item 
              index="5"
              route="/Login">
                          {{ navText }}
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
      activeIndex2: "",
      searchKeyword: '',
      imgUrl: require("./assets/logo.png"),
      navText: "Logout"
    };
  },
  methods: {
    handleSelect(key, keyPath) {

    },
    search() {
      this.$router.push({
        path:'/Search',
        query: {
          keywords: this.searchKeyword
        }
      })
    }
  },
  watch: {
    async $route(current, from){
      var currentPath = this.$route.path
      if (currentPath === '/Search') {
        this.activeIndex2 = "0"
      }
      if(currentPath === '/Login') {
        this.activeIndex2 = '5'
      }
      if (currentPath === '/BuyerOrderList') {
        this.activeIndex2 = '4-1'
      }
      if (currentPath === "/ItemList") {
        this.activeIndex2 = "3-1"
      }
      if(currentPath === "/SellerOrderList") {
        this.activeIndex2 = "3-2"
      }
      if (currentPath === '/SellNewProduct') {
        this.activeIndex2 = "3-3"
      }
      if(currentPath === '/') {
        this.activeIndex2 = "1"
      }
      if (currentPath === '/My'){
        this.activeIndex2 = '2'
      }
      if (currentPath === '/Order/Details' ||currentPath === '/Order/Create' ) {
        this.activeIndex2 = '0'
      }
      if(!localStorage.getItem("trading-token")) {
        this.navText = "Login"
      }
      if(currentPath != "/" && currentPath != "/Login") {
        var token = localStorage.getItem("trading-token")
        if(token == null) {
          console.log("token is null")
          this.navText = "Login"
          this.$router.push({path: "/Login", query: {ref: current.path}})
          this.$message.error("You haven't login yet! Please Login!")
          return false;
        } else {
          console.log("token is not null")
          await this.axios.get("http://localhost:8081/account/valid", {params: {token: token}})
              .then(resp => {
                console.log(resp)
                if (resp.data.code !== 0) {
                  localStorage.removeItem("trading-token")
                  this.navText = "Login"
                  this.$router.push({path: "/Login", query: {ref: current.fullPath}})
                  this.$message.error(resp.data.description)
                  return false;
                }
              })
        }
      }
      this.searchKeyword = this.$route.query.keywords
    },
  },
  async created() {
    var currentPath = this.$route.path
    if (currentPath === '/Search') {
      this.activeIndex2 = "0"
    }
    if(currentPath === '/Login') {
      this.activeIndex2 = '5'
    }
    if (currentPath === '/BuyerOrderList') {
      this.activeIndex2 = '4-1'
    }
    if (currentPath === "/ItemList") {
      this.activeIndex2 = "3-1"
    }
    if(currentPath === "/SellerOrderList") {
      this.activeIndex2 = "3-2"
    }
    if (currentPath === '/SellNewProduct') {
      this.activeIndex2 = "3-3"
    }
    if(currentPath === '/') {
      this.activeIndex2 = "1"
    }
    if (currentPath === '/My'){
      this.activeIndex2 = '2'
    }
    if (currentPath === '/Order/Details' || currentPath === '/Order/Create') {
      this.activeIndex2 = '0'
    }
    if(!localStorage.getItem("trading-token")) {
      this.navText = "Login"
    }
    if(currentPath != "/" && currentPath != "/Login") {
      var token = localStorage.getItem("trading-token")
      if(token == null) {
        console.log("token is null")
        this.$router.push("/Login")
        this.$message.error("You haven't login yet! Please Login!")
        return false;
      } else {
        console.log("token is not null")
        await this.axios.get("http://localhost:8081/account/valid", {params: {token: token}})
                  .then(resp => {
                    console.log(resp)
                    if (resp.data.code !== 0) {
                      localStorage.removeItem("trading-token")
                      this.$router.push("/Login")
                      this.$message.error(resp.data.description)
                      return false;
                    }
                  })
      }
      this.searchKeyword = this.$route.query.keywords
    }
  }
};
</script>

<style scoped>
.action {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
