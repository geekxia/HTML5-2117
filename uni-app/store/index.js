import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import study from './modules/study'

const store = new Vuex.Store({
  modules: { study }
})

export default store
