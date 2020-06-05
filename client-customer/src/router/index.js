import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Cart from '../views/Cart.vue'
import Register from '../views/Register.vue'
import ProductDetail from '../views/ProductDetail.vue'
import HistoryCart from '../views/HistoryCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/product/:productId',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/history/cart',
    name: 'HistoryCart',
    component: HistoryCart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
