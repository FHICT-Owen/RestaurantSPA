import { createStore } from 'vuex'
import categoryDataService from '@/services/CategoryDataService'
import dishDataService from '@/services/DishDataService'

export default createStore({
  state: {
    categories: [] as Category[],
    dishes: [] as Dish[],
    isOpen: false,
    countOption: 0,
    countComp: 0
  },
  mutations: {
    setCategories: (state, categories) => { state.categories = categories },
    setDishes: (state, dishes) => { state.dishes = dishes },
    toggleIsOpen: (state) => { state.isOpen = !state.isOpen },
    createNewDish: (state) => { state.isOpen = !state.isOpen },
    incrementOption: state => state.countOption++,
    incrementComp: state => state.countComp++
  },
  actions: {
    async getAllCategories ({ commit }) {
      const categories = await categoryDataService.getAllCategories()
      return commit('setCategories', categories)
    },
    async getAllDishes ({ commit }) {
      const dishes = await dishDataService.getAllDishes()
      return commit('setDishes', dishes)
    },

    async createNewCategory ({commit}, category:Category) {
      await categoryDataService.createCategory(category)
    },

    toggleIsOpen: ({ commit }) => commit('toggleIsOpen'),
    async createNewDish ({ commit }, dish: Dish) {
      await dishDataService.createDish(dish)
      return commit('toggleIsOpen')
    },
    incrementOption: ({ commit }) => commit('incrementOption'),
    incrementComp: ({ commit }) => commit('incrementComp')
  },
  modules: {
  }
})
