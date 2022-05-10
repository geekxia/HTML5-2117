// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    task: '',
    list: []
  },
  getTask (ev) {
    // console.log('--', ev)
    this.setData({
      task: ev.detail.value
    })
  },

  confirm () {
    console.log('--list', this.data.list)
    this.setData({
      list: [...this.data.list, {id:Date.now(),task:this.data.task}],
      task: ''
    })
  },

  onPullDownRefresh () {
    console.log('---下拉了')
  }
})
