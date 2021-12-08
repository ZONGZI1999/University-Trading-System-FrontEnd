import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import $ from 'jquery'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.axios = axios
axios.interceptors.request.use(
    config =>{
      let token = localStorage.getItem('trading-token')
      if(token){
        //这里面获取的请求头的键(tokenHeader)根据每个后端的习惯封装的名称各不相同
        config.headers.common['trading-token'] = token
      }
      return config
    }, error =>{
      return Promise.reject(error)
    }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
