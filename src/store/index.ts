import { createStore, useStore as baseUseStore, Store, Commit } from 'vuex'
import categoryDataService from '@/services/CategoryDataService'
import dishDataService from '@/services/DishDataService'
import tableDataService from '@/services/TableDataService'
import ingredientDataService from '@/services/IngredientDataService'
import { Dish, Order, Restaurant } from '../classes'
import { InjectionKey } from '@vue/runtime-dom'
import orderDataService from '@/services/OrderDataService'
import SessionDataService from '@/services/SessionDataService'
import restaurantDataService from '@/services/RestaurantDataService'

export interface State {
  categories: Category[]
  selectedCategory: string[]
  
  dishes: Dish[]
  currentDish: Dish

  restaurants: Restaurant[]
  
  ingredients: Ingredient[]

  totalPrice: number
  orders: Order[]
  currentOrder: Order

  tables: Table[]
  selectedTableIds: number[]
  
  isDishDialogOpen: boolean
  isEditDialog: boolean

	isTableDialogOpen: boolean

  isConfirmDialogOpen: boolean
  currentConfirmDialogObject: Object
  confirmDeleteFunction: Function

  popUps: PopUp[]

  sessions: Session[]
  sessionId: string

  apiToken: string
  filter: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    categories: [],
    selectedCategory: [],
    
    dishes: [],
    currentDish: new Dish(),
    
    restaurants: [],

    ingredients: [],

    totalPrice: 0,
    orders: [],
    currentOrder: new Order,

    tables: [] as Table[],
    selectedTableIds: [] as number[],

    isDishDialogOpen: false,
    isEditDialog: false,

    isTableDialogOpen: false,

    isConfirmDialogOpen: false,
    currentConfirmDialogObject: {},
    confirmDeleteFunction: new Function(),

    popUps: [],

    sessions: [] as Session[],
    sessionId: 's',

    apiToken: '',
    filter: 0
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
    setRestaurants: async (state) => state.restaurants = await restaurantDataService.getAllRestaurants(),
    setOrders: async (state) => state.orders = await orderDataService.getAllOrders(),
    setTables: async (state) => state.tables = await tableDataService.getAllTables(),
    setSessions: async (state) => state.sessions = await SessionDataService.getAllSessions(),
    toggleDialog: (state, payload) => {
      state.isDishDialogOpen = !state.isDishDialogOpen
      state.isEditDialog = payload
    },
    toggleTableDialog: (state) => {
      state.isTableDialogOpen = !state.isTableDialogOpen
    },
    closeDishDialog: (state) => state.isDishDialogOpen = false,
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
    },
    setFilter: (state, payload) => state.filter = payload
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
    createNewRestaurant: ({ commit }, restaurant: Restaurant) => {
      restaurantDataService
        .createRestaurant(restaurant)
        .then(() => commit('setRestaurant'))
    },
    createNewIngredient({ commit }, ingredient: Ingredient) {
      ingredientDataService
        .createIngredient(ingredient)
        .then(() => commit('setIngredients'))
    },
    createNewTable({ commit }, table: Table){
      tableDataService
        .createTable(table)
        .then(() => commit('setTables'))
    },

    editCategory({ commit }, category: Category) {
      categoryDataService
        .editCategory(category)
        .then(() => commit('setCategories'))
    },
    editRestaurant({ commit }, restaurant: Restaurant) {
      restaurantDataService
        .editRestaurant(restaurant)
        .then(() => commit('setRestaurant'))
    },
    editDish({ commit }, dish: Dish) {
      dishDataService.editDish(dish).then(() => commit('setDishes'))
    },
    updateTable({ commit }, table: Table) {
      tableDataService.updateTable(table).then(() => commit('setTables'))
    },
    updateIngredient({ commit }, ingredient: Ingredient) {
      ingredientDataService.updateIngredient(ingredient).then(() => commit('setIngredients'))
    },
    updateOrder({ commit }, order: Order) {
      orderDataService.updateOrder(order).then(() => commit('setOrders'))
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
    deleteRestaurant({ commit }, restaurant: Restaurant) {
      restaurantDataService
        .deleteRestaurant(restaurant)
        .then(() => commit('setRestaurant'))
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
