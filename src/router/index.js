import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/My',
    name: "My",
    component: () => import('../views/My.vue')
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
    path: '/EditProductInfo',
    name: "Edit Product Info",
    component: () => import('../views/Seller/SellNewProduct.vue')
  },
  {
    path: '/SellerOrderList',
    name: 'Seller Order List',
    component: () => import('../views/Order/OrderList.vue')
  },
  {
    path: '/BuyerOrderList',
    name: 'Buyer Order List',
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
      },
      {
        path: 'Details',
        component: () => import('../views/Order/Create.vue')
      }
    ]
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/Buyer/ItemResultList')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
