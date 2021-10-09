import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/SellerCenter',
    name: 'Seller Center',
    component:() => import('../views/Seller/SellerCenter.vue')
  },
  {
    path: '/SellNewProduct',
    name: 'Sell New Product',
    component:() => import('../views/Seller/SellNewProduct.vue')
  },
  {
    path: '/OrderList',
    name: 'Order List',
    component: () => import('../views/Order/OrderList.vue')
  },
  {
    path: '/ItemDetail',
    name: 'Item Detail',
    component: () => import('../views/Buyer/ItemDetails.vue')
  },
  {
    path: '/ItemList',
    name: 'Item List',
    component: () => import('../views/Buyer/ItemResultList.vue')

  },
  {
    path: '/Order',
    component: () => import('../views/Order/Order.vue'),
    children:[
      {
        path: 'Create',
        component: ()=> import('../views/Order/Create.vue')
      },
      {
        path: 'Pay',
        component: ()=> import('../views/Order/Pay.vue')
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
