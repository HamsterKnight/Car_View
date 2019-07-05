const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 路径别名设置
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
  },

  // 跨域设置
  devServer: {
    port: 3001, // 修改服务器端口号
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  //lintOnSave: false   // 取消 eslint 验证
}
