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
            console.log('le login')
            console.log(resp)
            console.log(resp.data)
            console.log(resp.data.fk_group)
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
    },
    register ({ commit }, user) {
      console.log(user.input.email)
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axiosInstance.post('/login/signup',
          {
            email: user.input.email,
            first_name: user.input.first_name,
            last_name: user.input.last_name,
            age: user.input.age,
            username: user.input.username,
            birth_date: user.input.birthDate,
            fk_group: 1,
            password: user.input.password
          }
        )
          .then(resp => {
            const user = resp.data
            localStorage.setItem('user', JSON.stringify(resp.data))
            commit('auth_success', user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('user')
            reject(err)
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.user,
    authStatus: state => state.status
  }
})
