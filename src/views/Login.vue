<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">Login</h3>
      <el-form-item label="Student ID" prop="username" label-width="100px">
        <el-input type="text" placeholder="Please Enter Your Student ID" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="Password" prop="password" label-width="100px">
        <el-input type="password" placeholder="Please Enter Your Password" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onLogin">Login</el-button>
        <el-button type="info" plain >?</el-button>
      </el-form-item>
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

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: 'Student ID cannot be empty!', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Password cannot be empty!', trigger: 'blur'}
          ]
        },

      }
    },
    methods: {
      onLogin(){
        var sendData = {}
        sendData['studentId'] = this.form.username
        this.axios.post("http://localhost:8081/account/login", sendData)
                  .then(resp => {
                    if (resp.data.code == 0) {
                      var key = resp.data.data.tokenName
                      var token = resp.data.data.tokenValue
                      localStorage.setItem(key, token)
                      console.log(resp)
                      console.log(localStorage.getItem(key))
                    }
                  })
      }
    }
  }
</script>

<style  scoped>
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