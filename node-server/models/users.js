const mongoose = require('mongoose')

// 要想操作(CURD)数据库中的集合，必须创建ODM模型！！！
// mongoose.model(集合名称要用复数, 描述集合中文档的样子)
const userModel = mongoose.model('users', new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  role_name: String,
  age: Number,
  create_time: { type: Number, default: Date.now() },
  status: { type: Number, default: 1 },
  mobile: String,
  id_card: { type: String, default: '' }
}))

module.exports = userModel
