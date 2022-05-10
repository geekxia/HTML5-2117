import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router.ts'
import store from './store/index.ts'

import { Button } from 'vant'

// const app = createApp(App)
const app = createApp({
  data () {
    return {}
  },
  render() {
    return h(App)
  }
}, {version:'v3'}) // 给App组件传递props属性

app.use(router)  // 注册路由系统
app.use(store)   // 注册状态管理

app.use(Button)  // 注册全局组件

// 全局数据（相当于Vue2的原型链功能）
app.config.globalProperties.baseUrl = 'http://localhost:9999'

app.mount('#app') // 挂载
