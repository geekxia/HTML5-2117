const http = require('http')  // Node内置模块(非全局模块)
const fs = require('fs')      // 用于执行文件的读写操作
const path = require('path')  // 用于处理路径的内置模块

// request 表示一次HTTP会话的请求体对象
// response 表示一次HTTP会话的响应体对象
// 静态资源服务器的本质：根据URI来读取相对的静态文件，把数据流传递给客户端。
// 问题：如果在静态资源中动态API请求，就需要进一步接收request中的query查询参数或body体中的数据，这将会导致代码更加复杂。所以我们推荐使用node服务框架来开发。
const handler = (request,response) => {
  // 一个完整的HTTP handler至少得干三件事：接收请求、处理请求、响应请求。
  // console.log('请求体path', request.path)
  console.log('请求体url', request.url)
  const url = request.url
  // 静态资源访问
  let filePath = (url==='/') ? '/index.html' : url
  // __dirname 表示当前JS文件所在的绝对路径
  // .join() 把相对路径变成绝对路径
  filePath = path.join(__dirname, `/public${filePath}`)

  // 如果这个路径不存在，会执行err报错，如果存在就有stat
  fs.stat(filePath, function(err, stat){
    // 路径不存在，响应客户端404
    if (err) {
      response.writeHeader(404)
      response.end('')  // 结束掉HTTP会话
    }
    // 用于判断一个路径是具体的文件，还是一个目录
    // 当客户端正在访问一个具体的并且存在的文件时
    if (stat && stat.isFile()) {
      const readStream = fs.createReadStream(filePath)
      readStream.pipe(response) // 管道流
    }
  })
}
// 创建HTTP服务器
// 每当客户端有请求发送过来时，handler回调都会执行并处理。
const server = http.createServer(handler)

// 所有的服务器都要有端口号（几乎每个应用程序都有端口）
server.listen(8888, ()=>console.log('server is running on 8888'))
