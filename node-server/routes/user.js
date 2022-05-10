const express = require('express')
const router = express.Router()
const userModel = require('../models/users')

// 查询操作
router.get('/list', (req, res) => {
  // 接收请求
  // 对非必填参数，都要考虑undefined问题
  // 对必填参数要验证，验证失败时结束HTTP会话，不操作数据
  let { page, size, name, role } = req.query
  // 用于分页
  page = Number(page || 1)  // 默认查询第1页
  size = Number(size || 10) // 默认10条一页
  // 设置查询条件
  let params = {
    username: new RegExp(name || ''),  // 用户名搜索功能
    // age: { $gte: 0, $lte: 20 },     // 范围查询
    status: 1,       // 只查询正常用户（过滤掉那些已删除的用户）
  }
  if (role != undefined) params['role'] = role  // 根据指定角色来查询

  // 处理请求
  userModel.find(params).count().then(total=>{
    userModel.find(params)
      .sort({age:-1,username:1})   // 排序 -1降序 1升序
      .skip((page-1)*size).limit(size)  // 分页
      .then(list=>{
        // 响应请求
        res.json({err:0,msg:'success',data:{ total, list }})
      })
      .catch(()=>{})
  })
})

// 新增or编辑（通常是同一个接口）
router.post('/form', (req, res) => {
  console.log('入参', req.body)
  // 注意：要使用body-parser先解析，才能取出body中的数据
  const { id, username, id_card } = req.body
  // 校验必填字段
  if (!username) return res.json({err:1,msg:'用户名是必填字段'})
  if (!id_card) return res.json({err:1,msg:'身份证是必填字段'})
  // 校验数据格式
  if (!/^[a-zA-Z]{4,8}$/.test(username)) {
    return res.json({err:2,msg:'用户名必须由4~8位的字母组成'})
  }
  if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id_card)) {
    return res.json({err:2,msg:'身份证号码格式有误'})
  }
  // 用户名是不能重复的
  userModel.find({username}).then(list=>{
    if (list.length>0) {
      return res.json({err:2,msg:`${username} 已被占用`})
    } else {
      // 当用户名符合要求且不重复时，入库操作
      const ele = {
        username,
        id_card,
        password: id_card.slice(-6),  // 取身份证后6位作为用户默认密码
        create_time: Date.now()
      }
      // 在这里根据id来判断是新增还是编辑？
      if (id) {
        userModel.updateOne({_id: id}, {$set:ele})
          .then(()=>res.json({err:0,msg:'success',data:{username}}))
          .catch(()=>res.json({err:1,msg:'用户id有误'}))
      } else {
        userModel.insertMany(ele)
          .then(()=>{
            res.json({err:0,msg:'success',data:{username}})
          })
          .catch(()=>{})
      }
    }
  })
})

// 删除（只做单条删除）
// 在真实开发中，不会真正删除数据，只用更新数据的状态即可
router.post('/delete', (req, res) => {
  const { id } = req.body
  console.log('id', id)
  if (!id) return res.json({err:1,msg:'用户ID有误'})
  userModel.updateOne({_id:id}, {$set:{status:0}})
    .then(()=>{res.json({err:0,msg:'success',data:{id}})})
    .catch(()=>{res.json({err:3,msg:'用户ID有误'})})
})

module.exports = router
