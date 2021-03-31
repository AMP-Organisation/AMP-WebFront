import Vue from 'vue'
import Vuex from 'vuex'
import { axiosInstance } from 'boot/axios'

// import example from './module-example'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    user: localStorage.getItem('user') || ''
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, user) {
      state.status = 'success'
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.user = ''
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axiosInstance.post('/login/signin',
          {
            email: user.input.email,
            password: user.input.password
          }
        )
          .then(resp => {
            localStorage.setItem('user', JSON.stringify(resp.data))
            commit('auth_success', user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('user')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('user')
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.user,
    authStatus: state => state.status
  }
})
