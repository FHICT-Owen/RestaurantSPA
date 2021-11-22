import { createStore, useStore as baseUseStore, Store, Commit } from 'vuex'
import categoryDataService from '@/services/CategoryDataService'
import dishDataService from '@/services/DishDataService'
import tableDataService from '@/services/TableDataService'
import ingredientDataService from '@/services/IngredientDataService'
import Dish from '@/classes/Dish'
import { InjectionKey } from '@vue/runtime-core'

export interface State {
  categories: Category[]
  dishes: Dish[]
  ingredients: Ingredient[]
  tables: RestaurantTable[]
  selectedTableIds: number[]
  selectedCategory: string[]

  isDishDialogOpen: boolean
  isEditDialog: boolean
  currentDish: Dish

  isConfirmDialogOpen: boolean
  currentConfirmDialogObject: Object
  confirmDeleteFunction: Function
  
  popUps: PopUp[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    categories: [] as Category[],
    dishes: [] as Dish[],
    tables: [] as RestaurantTable[],
    selectedTableIds: [] as number[],
    ingredients: [],

    selectedCategory: [],

    isDishDialogOpen: false,
    isEditDialog: false,
    currentDish: new Dish,

    isConfirmDialogOpen: false,
    currentConfirmDialogObject: {},
    confirmDeleteFunction: new Function,
    
    popUps: [],
  },
  mutations: {
    getAllCategories: (state, categories) => { state.categories = categories },
    getAllDishes: (state, dishes) => { state.dishes = dishes },
    getAllTables: (state, tables) => { state.tables = tables },
    setCategories: async (state) => { state.categories = await categoryDataService.getAllCategories(), state.categories.unshift({id: 0, name: 'all'}) },
    setDishes: async (state) => state.dishes = await dishDataService.getAllDishes(),
    setIngredients: async (state) => state.ingredients = await ingredientDataService.getAllIngredients(),
    toggleDialog: (state, payload) => { 
      state.isDishDialogOpen = !state.isDishDialogOpen, 
      state.isEditDialog = payload
    },
    closeDishDialog: (state) => state.isDishDialogOpen = false,
    setSelectedCategory: (state, payload: string) => {
      if (payload.trim().toLowerCase() === 'all')
        state.selectedCategory = state.categories.map(category => category.name)
      else {
        state.selectedCategory = []
        state.selectedCategory.push(payload.trim())
      }
    },
    toggleConfirmDialog: (state, payload) => { 
      state.isConfirmDialogOpen = !state.isConfirmDialogOpen,
      state.currentConfirmDialogObject = payload.object
      state.confirmDeleteFunction = payload.function
    },
    closeConfirmDialog: (state) => state.isConfirmDialogOpen = false,
    setCurrentDish: (state, payload) => state.currentDish = payload,
    createNewDish: (state) => state.isDishDialogOpen = !state.isDishDialogOpen,
  },
  actions: {
    createNewCategory: ({commit}, category: Category) => {
      categoryDataService.createCategory(category)
        .then(() => commit('setCategories'))
    },
    createNewDish ({commit}, dish: Dish) {
      dishDataService.createDish(dish)
        .then(() => commit('setDishes'))
    },
    createNewIngredient ({commit}, ingredient: Ingredient) {
      ingredientDataService.createIngredient(ingredient)
        .then(() => commit('setIngredients'))
    },
    
    async getAllTables({commit}){
      const tables = await tableDataService.getAllTables()
      return commit('getAllTables', tables)
    },

    editCategory({commit}, category: Category) {
      categoryDataService.editCategory(category)
        .then(() => commit('setCategories'))
    },
    editDish({commit}, dish: Dish) {
      dishDataService.editDish(dish)
        .then(() => commit('setDishes'))
    },
    
    deleteObject({state}) {
      state.confirmDeleteFunction()
      state.isConfirmDialogOpen = false
    },
    deleteDish({commit}, dish: Dish) {
      dishDataService.deleteDish(dish)
        .then(() => commit('setDishes'))
    },
    deleteCategory({commit}, category: Category) {
      categoryDataService.deleteCategory(category)
        .then(() => commit('setCategories'))
    },
    deleteIngredient({commit}, ingredient: Ingredient) {
      ingredientDataService.deleteIngredient(ingredient)
        .then(() => commit('setIngredients'))
    },

    openConfirmDialog: ({commit}, payload) => commit('toggleConfirmDialog', payload),
    toggleDialog: ({commit}, payload) => commit('toggleDialog', payload),
    
    setCurrentDish: ({commit}, payload) => commit('setCurrentDish', payload),
    removeIngredientFromCurrentDish: ({state}, payload) => 
      state.currentDish.ingredients.splice(state.currentDish.ingredients.indexOf(payload), 1)
  },
  modules: {
  }
})
export function useStore () {
  return baseUseStore(key)
}