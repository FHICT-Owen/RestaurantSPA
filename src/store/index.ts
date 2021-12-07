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
  selectedCategory: string[]
  
  dishes: Dish[]
  currentDish: Dish
  
  ingredients: Ingredient[]

  totalPrice: number
  orders: Order[]
  currentOrder: Order
  canPlaceOrder: boolean

  tables: RestaurantTable[]
  selectedTableIds: number[]
  
  isDishDialogOpen: boolean
  isEditDialog: boolean

  isConfirmDialogOpen: boolean
  currentConfirmDialogObject: Object
  confirmDeleteFunction: Function

  popUps: PopUp[]

  sessionId: string
  apiToken: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    categories: [],
    selectedCategory: [],
    
    dishes: [],
    currentDish: new Dish(),
    
    ingredients: [],

    totalPrice: 0,
    orders: [],
    currentOrder: new Order,
    canPlaceOrder: true,

    tables: [] as RestaurantTable[],
    selectedTableIds: [] as number[],

    isDishDialogOpen: false,
    isEditDialog: false,

    isConfirmDialogOpen: false,
    currentConfirmDialogObject: {},
    confirmDeleteFunction: new Function(),

    popUps: [],

    sessionId: 's',
    apiToken: ''
  },
  mutations: {
    setCategories: async (state) => {
      state.categories = await categoryDataService.getAllCategories()
      state.selectedCategory = state.categories
        .filter((c) => state.dishes.find((d) => d.category == c.name))
        .map((c) => c.name)
    },
    setDishes: async (state) => state.dishes = await dishDataService.getAllDishes(),
    setIngredients: async (state) => state.ingredients = await ingredientDataService.getAllIngredients(),
    setOrders: async (state) => state.orders = await orderDataService.getAllOrders(),
    setTables: async (state) => state.tables = await tableDataService.getAllTables(),
    toggleDialog: (state, payload) => {
      state.isDishDialogOpen = !state.isDishDialogOpen
      state.isEditDialog = payload
    },
    closeDishDialog: (state) => state.isDishDialogOpen = false,
    setOrderPrepared: async (state, payload: boolean) => {
        
    },
    setSelectedCategory: (state, payload: string) => {
      if (payload.trim().toLowerCase() === 'all')
        state.selectedCategory = state.categories
          .filter((c) => state.dishes.find((d) => d.category == c.name))
          .map((c) => c.name)
      else {
        state.selectedCategory = []
        state.selectedCategory.push(payload.trim())
      }
    },
    toggleConfirmDialog: (state, payload) => {
      state.isConfirmDialogOpen = !state.isConfirmDialogOpen
      state.currentConfirmDialogObject = payload.object
      state.confirmDeleteFunction = payload.function
    },
    closeConfirmDialog: (state) => state.isConfirmDialogOpen = false,
    setCurrentDish: (state, payload) => state.currentDish = payload,
    createNewDish: (state) => state.isDishDialogOpen = !state.isDishDialogOpen,
    setToken: (state, payload) => state.apiToken = payload,
    addToSelectedTableIds: (state, payload) => state.selectedTableIds.push(payload),
    setSessionId: (state, payload) => state.sessionId = payload,
    addOrder: (state, payload) => {
      state.currentOrder.dishes.push(payload.name)
      state.totalPrice += payload.prize
    },
    removeOrder: (state, payload) => { 
      const index = state.currentOrder.dishes.indexOf(payload.name)
      if (index != -1){
        state.currentOrder.dishes.splice(index, 1)
        state.totalPrice -= payload.prize
      }
    }
  },
  actions: {
    createNewCategory: ({ commit }, category: Category) => {
      categoryDataService
        .createCategory(category)
        .then(() => commit('setCategories'))
    },
    createNewDish({ commit }, dish: Dish) {
      dishDataService.createDish(dish).then(() => commit('setDishes'))
    },
    createNewIngredient({ commit }, ingredient: Ingredient) {
      ingredientDataService
        .createIngredient(ingredient)
        .then(() => commit('setIngredients'))
    },
    createNewTable({ commit }){
      // tableDataService.createTable()
    },

    editCategory({ commit }, category: Category) {
      categoryDataService
        .editCategory(category)
        .then(() => commit('setCategories'))
    },
    editDish({ commit }, dish: Dish) {
      dishDataService.editDish(dish).then(() => commit('setDishes'))
    },

    deleteObject({ state }) {
      state.confirmDeleteFunction()
      state.isConfirmDialogOpen = false
    },
    deleteDish({ commit }, dish: Dish) {
      dishDataService.deleteDish(dish).then(() => commit('setDishes'))
    },
    deleteCategory({ commit }, category: Category) {
      categoryDataService
        .deleteCategory(category)
        .then(() => commit('setCategories'))
    },
    deleteIngredient({ commit }, ingredient: Ingredient) {
      ingredientDataService
        .deleteIngredient(ingredient)
        .then(() => commit('setIngredients'))
    },

    openConfirmDialog: ({ commit }, payload) =>
      commit('toggleConfirmDialog', payload),
    toggleDialog: ({ commit }, payload) => commit('toggleDialog', payload),

    setCurrentDish: ({ commit }, payload) => commit('setCurrentDish', payload),
    removeIngredientFromCurrentDish: ({ state }, payload) =>
      state.currentDish.ingredients.splice(
        state.currentDish.ingredients.indexOf(payload),
        1
      ),
    removeTableFromSelectedTableIds: ({ state }, payload) =>
      state.selectedTableIds.splice(
        state.selectedTableIds.indexOf(payload),
        1
      ),
  },
  modules: {},
})
export function useStore() {
  return baseUseStore(key)
}
