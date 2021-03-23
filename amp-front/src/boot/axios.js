import Vue from 'vue'
import axios from 'axios'

let axiosInstance = ''

if (process.env.DEBUGGING) {
  axiosInstance = axios.create({
    baseURL: ''
    /** http://localhost:8000/api/v1 **/
  })
} else {
  axiosInstance = axios.create({
    baseURL: 'https://api.example.com'
  })
}

Vue.prototype.$axios = axiosInstance

export { axiosInstance }
