const state = {
  msg: 'Hello Vuex'
}

const mutations = {
  changeMsg (state, payload) {
    state.msg = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
