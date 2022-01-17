interface Category {
  id: number
  name: string
  name_NL: string
}

interface Dish {
  id: number
  name: string
  name_NL: string
  description: string
  description_NL: string
  category: string
  dietaryRestrictions: string[]
  ingredients: string[]
  prize: string
  image: string
}

interface Ingredient {
  id: number
	restaurantId: number
	name: string
	name_NL: string
	isAllergen: boolean
	isInStock: boolean
}

interface Table {
  id: number
  tableNumber: number
  restaurantId: number
  isActive: boolean
  inUse: boolean
}

enum OrderState {
  isUnapproved = 'isUnapproved', 
  isApproved = 'isApproved',
  isBeingPrepared = 'isBeingPrepared',
  isReady = 'isReady',
  isArchived = 'isArchived',
  isCanceled = 'isCanceled'
}

interface Order {
  id: number
  sessionId: number
  tableNumber: number
  dishes: string[]
  comments: string
  orderState: OrderState
  timeStamp: number
}

interface Session {
  id: string
  tableId: number
}

interface PopUp {
  text: string
  isError: boolean
}

interface Restaurant {
  id: number
  name: string
}

export { OrderState, PopUp, Order, Table, Session, Restaurant, Ingredient, Category, Dish }  