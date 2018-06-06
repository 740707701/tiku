module.exports = {
  proxy: {
    '/Portal': { //将服务器地址http://tiku.xuedian98.com/Portal映射为 /Portal
      target: 'http://tiku.xuedian98.com:8080/Portal',
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/Portal': ''
      }
    }
  }
}