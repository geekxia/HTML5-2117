const express = require('express')  // 导入node_modules中的第三方包
var bodyParser = require('body-parser')  // 用于解析POST请求的body体中的数据
// 在node环境实现HTTP请求的代理
const { createProxyMiddleware } = require('http-proxy-middleware')
// 使用express创建服务器
const app = express()

// 导入并执行数据库连接
require('./utils/connect')

// 构建静态资源服务器（静态资源中间件）
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const v = '/api/v1'
// 注册动态路由中间件
app.use(`${v}/user`, require('./routes/user'))
// app.use(`${v}/good`, require('./routes/good'))

// 解决HTTP代理问题（从8888端口代理到9999数据库服务）
// 如果你公司用的是Nginx或Apache，也有相应的代理方案
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://192.168.0.118:9999',   // 远程数据库服务
    changeOrigin: true
  })
)

app.listen(8888, ()=>console.log('server is running on 8888'))
