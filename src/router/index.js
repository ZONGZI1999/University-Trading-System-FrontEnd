import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/OrderList',
    name: 'Order List',
    component: () => import('../views/OrderList.vue')
  },
  {
    path: '/Order',
    component: () => import('../views/order/Order.vue'),
    children:[
      {
        path: 'Create',
        component: ()=> import('../views/order/Create.vue')
      },
      {
        path: 'Pay',
        component: ()=> import('../views/order/Pay.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
