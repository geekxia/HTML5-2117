import Vue from 'vue'

import uView from 'uni_modules/uview-ui'
Vue.use(uView)

import App from './App'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'
new Vue({
  ...App,
  store
}).$mount()
