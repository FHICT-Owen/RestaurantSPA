import { createStore, useStore as baseUseStore, Store, Commit } from 'vuex'
import categoryDataService from '@/services/CategoryDataService'
import dishDataService from '@/services/DishDataService'
import tableDataService from '@/services/TableDataService'
import ingredientDataService from '@/services/IngredientDataService'
import Dish from '@/classes/Dish'
import Order from '@/classes/Order'
import { InjectionKey } from '@vue/runtime-dom'
import orderDataService from '@/services/OrderDataService'

export interface State {

  categories: Category[]
  dishes: Dish[]
  ingredients: Ingredient[]

  orders: Order[]
  currentOrder: Order

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
  apiToken: string
  sessionId: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    categories: [],
    dishes: [],
    ingredients: [],

    orders: [],
    currentOrder: new Order,

    selectedCategory: [],
    tables: [] as RestaurantTable[],
    selectedTableIds: [] as number[],

    isDishDialogOpen: false,
    isEditDialog: false,
    currentDish: new Dish,

    isConfirmDialogOpen: false,
    currentConfirmDialogObject: {},
    confirmDeleteFunction: new Function,
    
    popUps: [],
    apiToken: '',
    sessionId: ''
  },
  mutations: {
    setCategories: async (state) => {
      state.categories = await categoryDataService.getAllCategories()
      state.selectedCategory = state.categories.filter(c => state.dishes.find(d => d.category == c.name)).map(c => c.name)
    },
    setDishes: async (state) => state.dishes = await dishDataService.getAllDishes(),
    setIngredients: async (state) => state.ingredients = await ingredientDataService.getAllIngredients(),
    setOrders: async (state) => state.orders = await orderDataService.getAllOrders(),
    setTables: async (state) => state.tables = await tableDataService.getAllTables(),
    toggleDialog: (state, payload) => { 
      state.isDishDialogOpen = !state.isDishDialogOpen, 
      state.isEditDialog = payload
    },
    closeDishDialog: (state) => state.isDishDialogOpen = false,
    setSelectedCategory: (state, payload: string) => {
      if (payload.trim().toLowerCase() === 'all')
        state.selectedCategory = state.categories.filter(c => state.dishes.find(d => d.category == c.name)).map(c => c.name)
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
    setToken: (state, payload) => state.apiToken = payload,
    addToSelectedTableIds: (state, payload) => state.selectedTableIds.push(payload),
    setSessionId: (state, payload) => state.sessionId = payload,
    addOrder: (state, payload) => state.currentOrder.dishes.push(payload),
    removeOrder: (state, payload) => { 
      const index = state.currentOrder.dishes.indexOf(payload)
      if (index != -1)
        state.currentOrder.dishes.splice(index, 1)
    }
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