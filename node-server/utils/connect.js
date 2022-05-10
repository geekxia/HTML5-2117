const mongoose = require('mongoose')

try {
  // 异步连接MongoDB数据库服务
  // mongodb 是MongoDB的协议
  // 27017 这是MongoDB服务器默认的端口（可省略）
  // qfdb 这是你的数据库名称（可自定义修改）
  // 注意：在使用mongoose连接数据库时，要先使用mongod启动数据库
  mongoose.connect('mongodb://localhost:27017/qfdb')
  // 如何判断数据库连接成功？（监听连接事件）
  const db = mongoose.connection
  db.on('open', ()=>console.log('数据库连接成功'))
  db.on('error', ()=>console.log('数据库连接失败'))
} catch (err) {
  console.log('MongoDB未启动，请先使用mongod启动数据库')
}
