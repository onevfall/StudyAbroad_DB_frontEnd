const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      // /api为后端数据接口的上下文路径
      '/api':{
        //target为后端数据接口的地址
        target:'http://43.142.41.192:6001/',
        changeOrigin:true
      }
    }
  }
})
