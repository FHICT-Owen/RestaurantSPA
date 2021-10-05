import { createStore } from 'vuex'
import categoryDataService from '@/services/CategoryDataService'

export default createStore({
  state: {
    categories: [] as Category[],
	  countOption: 0,
    countComp: 0
  },
  mutations: {
    setCategories: (state, categories) => state.categories = categories,
	  incrementOption: state => state.countOption += 1,
	  incrementComp: state => state.countComp += 1
  },
  actions: {
    async getAllCategories ({commit}) {
      const categories = await categoryDataService.getAllCategories()
      return commit('setCategories', categories)
  },
	  incrementOption: ({commit}) => commit('incrementOption'),
	  incrementComp: ({commit}) => commit('incrementComp')
  },
  modules: {
  }
})
