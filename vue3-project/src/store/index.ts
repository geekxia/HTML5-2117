import { createStore } from 'vuex'

import good from './modules/good.ts'

const store = createStore({
  modules: {
    good
  }
})

export default store
