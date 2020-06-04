import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    emailLogin: null,
    productList: ''
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_EMAIL_LOGIN (state, payload) {
      state.emailLogin = payload
    },
    SET_PRODUCT_LIST (state, payload) {
      state.productList = payload
    }
  },
  actions: {
    register (store, payload) {
      return server.post('/users/register', {
        email: payload.email,
        password: payload.password
      })
    },
    loginCustomer (store, payload) {
      return server.post('/users/login/customer', {
        email: payload.email,
        password: payload.password
      })
    },
    readProductByName (store, payload) {
      return server.post('/products/byName', {
        name: payload.name
      })
    },
    searchProduct (store, payload) {
      return server.get(`/products/${payload.productId}`)
    }
  },
  modules: {
  }
})
