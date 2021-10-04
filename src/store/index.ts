import { createStore } from 'vuex'

export default createStore({
  state: {
	  count: 0
  },
  mutations: {
	  increment: state => state.count += 1
  },
  actions: {
	increment: ({commit}) => commit('increment')
  },
  modules: {
  }
})
