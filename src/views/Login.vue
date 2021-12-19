<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <div v-if="!showLogout">
        <h3 class="login-title">Login</h3>
        <el-form-item label="Student ID" prop="username" label-width="100px">
          <el-input type="text" placeholder="Please Enter Your Student ID" v-model="form.username"/>
        </el-form-item>
        <el-form-item label="Password" prop="password" label-width="100px">
          <el-input type="password" placeholder="Please Enter Your Password" v-model="form.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onLogin">Login</el-button>
          <el-button type="info" plain>?</el-button>
        </el-form-item>
      </div>
      <div v-if="showLogout" style="margin-bottom: 10px">
        <h3 class="login-title">Hi, {{ studentId }}! <br/> Welcome to use University Trading System. </h3>
        <el-button type="primary" plain @click="logout" style="margin: 0 auto; display: block">Logout</el-button>
      </div>
    </el-form>


  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: 'Student ID cannot be empty!', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Password cannot be empty!', trigger: 'blur'}
        ]
      },
      showLogout: localStorage.getItem("trading-token") != null,
      studentId: localStorage.getItem("studentId")
    }
  },
  methods: {
    onLogin() {
      var sendData = {}
      sendData['studentId'] = this.form.username
      this.axios.post("http://localhost:8081/account/login", sendData)
          .then(resp => {
            if (resp.data.code == 0) {
              var key = resp.data.data.tokenName
              var token = resp.data.data.tokenValue
              localStorage.setItem(key, token)
              localStorage.setItem("studentId", resp.data.data.loginId)
              var ref = this.$route.query.ref == null ? "/My" : this.$route.query.ref;
              this.$router.push({path: ref})
              this.$message.success("Successfully Login!")
            }
          })
    },
    logout() {
      localStorage.removeItem("trading-token")
      localStorage.removeItem("studentId")
      this.showLogout = false

    }
  },
  created() {
    var token = localStorage.getItem("trading-token")
    var that = this
    if (token == null) {
      this.showLogout = false
    } else {
      console.log("token is not null")
      this.axios.get("http://localhost:8081/account/valid", {params: {token: token}})
          .then(resp => {
            console.log(resp)
            if (resp.data.code !== 0) {
              localStorage.removeItem("trading-token")
              that.showLogout = false;
            }
          })
    }
  }
}
</script>

<style scoped>
.login-box {
  border: 1px solid #DCDFE6;
  width: 450px;
  margin: 100px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>