import { createStore } from 'vuex'
import categoryDataService from '@/services/CategoryDataService'
import dishDataService from '@/services/DishDataService'
import ingredientDataService from '@/services/IngredientDataService'

export default createStore({
  state: {
    categories: [] as Category[],
    dishes: [] as Dish[],
    ingredients: [] as Ingredient[],
    isDishDialogOpen: false,
    isConfirmDialogOpen: true,
    isEditDialog: false,
    currentDish: {} as Dish,
    popUps: [] as PopUp[],
  },
  mutations: {
    getAllCategories: (state, categories) => { state.categories = categories },
    getAllDishes: (state, dishes) => { state.dishes = dishes },
    getAllIngredients: (state, ingredients) => { state.ingredients = ingredients },
    toggleDialog: (state, payload) => { 
      state.isDishDialogOpen = !state.isDishDialogOpen, 
      state.isEditDialog = payload
    },
    setCurrentDish: (state, payload) => {state.currentDish = payload},
    createNewDish: (state) => { state.isDishDialogOpen = !state.isDishDialogOpen },
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
    async getAllIngredients ({ commit }) {
      const dishes = await ingredientDataService.getAllIngredients()
      return commit('getAllIngredients', dishes)
    },

    async createNewCategory ({commit}, category: Category) {
      await categoryDataService.createCategory(category)
    },
    async createNewDish ({commit}, dish: Dish) {
      await dishDataService.createDish(dish)
      return commit('toggleDialog')
    },
    async createNewIngredient ({commit}, ingredient: Ingredient) {
      await ingredientDataService.createIngredient(ingredient)
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
    async deleteIngredient({commit}, ingredient: Ingredient) {
      await ingredientDataService.deleteIngredient(ingredient)
    },

    openConfirmDialog: ({commit}, payload) => commit('', payload),

    toggleDialog: ({commit}, payload) => commit('toggleDialog', payload),
    setCurrentDish: ({commit}, payload) => commit('setCurrentDish', payload),
  },
  modules: {
  }
})
