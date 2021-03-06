import Vue from 'vue'
import axios from 'axios'

let axiosInstance

if (process.env.DEBUGGING) {
  axiosInstance = axios.create({
    baseURL: ''
    /** http://localhost:8000/api/v1 **/
    /** http://localhost:2395/api/ **/
  })
} else {
  axiosInstance = axios.create({
    baseURL: 'https://amp-back.herokuapp.com/api'
  })
}

Vue.prototype.$axios = axiosInstance

export { axiosInstance, axios }
