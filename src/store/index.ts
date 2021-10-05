import { createStore } from 'vuex'

export default createStore({
  state: {
	  countOption: 0,
    countComp: 0
  },
  mutations: {
	  incrementOption: state => state.countOption += 1,
	  incrementComp: state => state.countComp += 1
  },
  actions: {
	  incrementOption: ({commit}) => commit('incrementOption'),
	  incrementComp: ({commit}) => commit('incrementComp')
  },
  modules: {
  }
})
