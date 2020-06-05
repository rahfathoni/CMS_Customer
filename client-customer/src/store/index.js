import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    emailLogin: null,
    productList: false,
    cartList: false,
    buyCart: '',
    deleteCart: '',
    cartNone: ''
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
    },
    SET_CART_LIST (state, payload) {
      state.cartList = payload
    },
    SET_BUY_CART (state, payload) {
      state.buyCart = payload
    },
    SET_DELETE_CART (state, payload) {
      state.deleteCart = payload
    },
    SET_CART_NONE (state, payload) {
      state.cartNone = payload
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
      return server.get(`/products/${payload.ProductId}`)
    },
    addCart (store, payload) {
      return server.post('/carts', {
        ProductId: payload.ProductId,
        quantity: payload.quantity
      }, {
        headers: {
          token: payload.token
        }
      })
    },
    readCart (store, token) {
      return server.get('/carts', {
        headers: {
          token
        }
      })
    },
    paymentItem (store, payload) {
      return server.put(`/carts/${payload.id}`, {
        isPaid: payload.isPaid
      }, {
        headers: {
          token: payload.token
        }
      })
    },
    deleteCartAction (store, payload) {
      return server.delete(`/carts/${payload.id}`, {
        headers: {
          token: payload.token
        }
      })
    }
  },
  modules: {
  }
})
