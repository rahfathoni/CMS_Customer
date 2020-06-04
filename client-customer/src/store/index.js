import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    emailLogin: null
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_EMAIL_LOGIN (state, payload) {
      state.emailLogin = payload
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
    }
  },
  modules: {
  }
})
