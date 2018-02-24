import axios from 'axios'
import Vue from 'vue'
const apiContext = '/api/movie'
let methods = ['get', 'post']
// let token = ''

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// application/x-www-form-urlencoded
// application/json

class Api {
  constructor (context = '') {
    methods.forEach(method => {
      this[method] = (path, data = {}) => new Promise((resolve, reject) => {

        let url = apiContext + context + path
        axios({
          method: method,
          url: url,
          data: data,
          timeout: 10000,
          headers: {
            // 'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          },
        }).then(res => {
          // console.log(`[${method}]${url}`, res)
          if (res.status === 200) {
            // if (res.data && res.data.status === 0) {
            if (res.data.code === 0) {
              resolve(res.data)
            } else {
              // Message({type: 'error', message: res.data.msg})
              reject(res.data)
            }
          }
        }).catch(error => {
          // console.log('error.response', error.response)
          // console.log('error.request', error.request)
          // if (error.response) {
          //   Message({type: 'error', message: error.response.msg})
          // } else {
          //   Message({type: 'error', message: error.message})
          // }
        })
      })
    })
  }
}

export default new Api()