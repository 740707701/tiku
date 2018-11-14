import axios from 'axios'

const apiContext = 'http://tiku.xuedian98.com:8080/Portal' //线上api地址
// const apiContext = 'http://192.168.0.177:8080/Portal' //本机
// const apiContext = 'http://101.132.166.37:8080/Portal' //测试环境api地址
let methods = ['get', 'post', 'put', 'delete']

class Api {
  constructor(context = '') {
    methods.forEach(method => {
      this[method] = (path, data = {}) => new Promise((resolve, reject) => {
        let url = apiContext + context + path
        axios.defaults.withCredentials = true; //让ajax携带cookie
        axios.defaults.headers.Authorization = location.search.split('=')[1]
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
          // console.log(`[${method}]${url}`, res)
          if (res.status === 200) {
            resolve(res.data)

            // if (res.data && res.data.status === 0) {
            // if (res.data.code === 0) {
            //   resolve(res.data)
            // } else {
            //   // Message({type: 'error', message: res.data.msg})
            //   reject(res.data)
            // }
          } else {
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