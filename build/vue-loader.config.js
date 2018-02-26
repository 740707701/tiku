// module.exports = {
//   extractCSS: process.env.NODE_ENV === 'production',
//   preserveWhitespace: false,
//   postcss: [
//     require('autoprefixer')({
//       browsers: ['last 3 versions']
//     })
//   ]
// }


const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ],
  loaders: isProd ? {
    less: ExtractTextPlugin.extract({
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true,
          sourceMap: true
        }
      }, {
        loader: 'less-loader'
      }],
      fallback: 'vue-style-loader'
    })
  } : {}
}
