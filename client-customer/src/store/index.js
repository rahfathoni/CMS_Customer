import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    register (store, payload) {
      return server.post('/users/register', {
        email: payload.email,
        password: payload.password
      })
    }
  },
  modules: {
  }
})
