import { createStore, useStore as baseUseStore, Store, Commit } from 'vuex'
import categoryDataService from '@/services/CategoryDataService'
import dishDataService from '@/services/DishDataService'
import tableDataService from '@/services/TableDataService'
import ingredientDataService from '@/services/IngredientDataService'
import { Category, Dish, Ingredient, Order, Restaurant, Session, Table } from '../classes'
import { InjectionKey } from '@vue/runtime-dom'
import orderDataService from '@/services/OrderDataService'
import SessionDataService from '@/services/SessionDataService'
import restaurantDataService from '@/services/RestaurantDataService'
import { OrderState, PopUp } from '@/types'
import NotificationDataService from '@/services/NotificationDataService'

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
  sessionTableNumber: number

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
  tableNumberFilter: number | null
  categoryFilter: string | null
  orderStateFilter: OrderState | null
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
    currentOrder: new Order('', 0, [], '', OrderState.isUnapproved),
    sessionTableNumber: 0,

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
    tableNumberFilter: null,
    categoryFilter: null,
    orderStateFilter: null
  },
  mutations: {
    setCategories: async (state) => {
      state.categories = await categoryDataService.getAllCategories()
      state.selectedCategory = state.categories
        .filter((c) => state.dishes.find((d) => d.category == c.name))
        .map((c) => c.name)
    },
    addCategory: async (state, payload) => {
      categoryDataService.createCategory(payload)
        .then(category => state.categories.push(category))
    },
    editCategory: async (state, payload) => {
      categoryDataService.editCategory(payload)
        .then(() => {
          const elementIndex = state.categories.findIndex(obj => obj.id == payload.id)
          Object.assign(state.categories[elementIndex], payload)
        })
    },
    addDish: async (state, payload) => {
      dishDataService.createDish(payload)
        .then(dish => state.dishes.push(dish))
    },
    editDish: async (state, payload) => {
      dishDataService.editDish(payload)
        .then(() => {
          const elementIndex = state.dishes.findIndex(obj => obj.id == payload.id)
          Object.assign(state.dishes[elementIndex], payload)
        })
    },
    addIngredient: async (state, payload) => {
      ingredientDataService.createIngredient(payload)
        .then(ingredient => state.ingredients.push(ingredient))
    },
    editIngredient: async (state, payload) => {
      ingredientDataService.editIngredient(payload)
        .then(() => {
          const elementIndex = state.ingredients.findIndex(obj => obj.id == payload.id)
          Object.assign(state.ingredients[elementIndex], payload)
        })
    },
    addOrder: async (state, payload) => {
      orderDataService.createOrder(payload)
        .then(order => state.orders.push(order))
    },
    editOrder: async (state, payload) => {
      orderDataService.editOrder(payload)
        .then(async () => {
          const elementIndex = state.orders.findIndex(obj => obj.id == payload.id)
          Object.assign(state.orders[elementIndex], payload)
          await NotificationDataService.notifyCustomer(payload)
        })
    },
    addTable: async (state, payload) => {
      tableDataService.createTable(payload)
        .then(table => state.tables.push(table))
    },
    editTable: async (state, payload) => {
      tableDataService.editTable(payload)
        .then(() => {
          const elementIndex = state.tables.findIndex(obj => obj.id == payload.id)
          Object.assign(state.tables[elementIndex], payload)
        })
      console.log(payload)
    },
    addRestaurant: async (state, payload) => {
      restaurantDataService.createRestaurant(payload)
        .then(restaurant => state.restaurants.push(restaurant))
    },
    editRestaurant: async (state, payload) => {
      restaurantDataService.editRestaurant(payload)
        .then(() => {
          const elementIndex = state.restaurants.findIndex(obj => obj.id == payload.id)
          Object.assign(state.restaurants[elementIndex], payload)
        })
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
    addDishToOrder: (state, payload) => {
      state.currentOrder.dishes.push(payload.name)
      state.totalPrice += payload.prize
    },
    removeDishFromOrder: (state, payload) => {
      const index = state.currentOrder.dishes.indexOf(payload.name)
      if (index != -1) {
        state.currentOrder.dishes.splice(index, 1)
        state.totalPrice -= payload.prize
      }
    },
    setCategoryFilter: (state, payload) => {
      (payload == state.categoryFilter) ?
        state.categoryFilter = null : state.categoryFilter = payload
    },
    setTableNumberFilter: (state, payload) => {
      (payload == state.tableNumberFilter) ?
        state.tableNumberFilter = null : state.tableNumberFilter = payload
    },
    setOrderStateFilter: (state, payload) => {
      state.orderStateFilter = payload
    },
    setSessionTableId: (state, payload) => {
      state.sessionTableNumber = payload
    }
  },
  actions: {
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
        .then(() => commit('setRestaurants'))
    },
    deleteIngredient({ commit }, ingredient: Ingredient) {
      ingredientDataService
        .deleteIngredient(ingredient)
        .then(() => commit('setIngredients'))
    },
    deleteTable({ commit }, table: Table) {
      tableDataService
        .deleteTable(table)
        .then(() => commit('setTables'))
    },

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
