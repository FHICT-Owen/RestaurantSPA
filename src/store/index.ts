import { createStore } from 'vuex'
import categoryDataService from '@/services/CategoryDataService'
import dishDataService from '@/services/DishDataService'

export default createStore({
  state: {
    categories: [] as Category[],
    dishes: [] as Dish[],
    isOpen: false,
    isEditDialog: false,
    currentDish: {} as Dish,
    popUpIsOpen: false,
    popUpText: '...',
    
    countOption: 0,
    countComp: 0
  },
  mutations: {
    getAllCategories: (state, categories) => { state.categories = categories },
    getAllDishes: (state, dishes) => { state.dishes = dishes },
    toggleDialog: (state, payload) => { 
      state.isOpen = !state.isOpen, 
      state.isEditDialog = payload
    },
    setCurrentDish: (state, payload) => {state.currentDish = payload},
    createNewDish: (state) => { state.isOpen = !state.isOpen },
    showPopUp: (state, payload) => {
      state.popUpIsOpen = !state.popUpIsOpen,
      state.popUpText = payload,
      setTimeout(() => {state.popUpIsOpen = !state.popUpIsOpen}, 3000)
    },
    
    incrementOption: state => state.countOption++,
    incrementComp: state => state.countComp++
  },
  actions: {
    async getAllCategories ({ commit }) {
      const categories = await categoryDataService.getAllCategories()
      return commit('getAllCategories', categories)
    },
    async getAllDishes ({ commit }) {
      const dishes = await dishDataService.getAllDishes()
      return commit('getAllDishes', dishes)
    },

    async createNewCategory ({commit}, category: Category) {
      await categoryDataService.createCategory(category)
    },
    async createNewDish ({commit}, dish: Dish) {
      await dishDataService.createDish(dish)
      return commit('toggleDialog')
    },

    async editDish({commit}, dish: Dish) {
      await dishDataService.editDish(dish)
      return commit('toggleDialog')
    },
    async editCategory({commit}, category: Category) {
      await categoryDataService.editCategory(category)
    },

    async deleteDish({commit}, dish: Dish) {
      await dishDataService.deleteDish(dish)
      return commit('toggleDialog')
    },
    async deleteCategory({commit}, category: Category) {
      await categoryDataService.deleteCategory(category)
    },

    toggleDialog: ({commit}, payload) => commit('toggleDialog', payload),
    setCurrentDish: ({commit}, payload) => commit('setCurrentDish', payload),
    showPopUp: ({commit}, payload) => commit('showPopUp', payload),

    incrementOption: ({ commit }) => commit('incrementOption'),
    incrementComp: ({ commit }) => commit('incrementComp')
  },
  modules: {
  }
})
