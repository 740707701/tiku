import axios from 'axios';
const apiContext = '/Portal'
let methods = ['get', 'post']
// let token = ''

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
            // 'Content-Type': 'application/json',
            "Content-Type": "application/json;charset=UTF-8",
            // "Cache-Control": "no-cache"
          },
        }).then(res => {
          console.log(`[${method}]${url}`, res)
          if (res.status === 200) {
            resolve(res.data)

            // if (res.data && res.data.status === 0) {
            // if (res.data.code === 0) {
            //   resolve(res.data)
            // } else {
            //   // Message({type: 'error', message: res.data.msg})
            //   reject(res.data)
            // }
          }else{
            reject(res.data)
          }
        }).catch(error => {
          console.log('error.response', error.response)
          console.log('error.request', error.request)
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