interface Category {
  id: number
  name: string
}

interface Dish {
  id: number
  name: string
  description: string
  category: string
  dietaryRestrictions: string[]
  ingredients: string[]
  prize: number
  image: string
}

interface Ingredient {
  id: number
  name: string
  isAllergen: boolean
}

interface Table {
  id: number
  tableNumber: number
  restaurantId: number
  isActive: boolean
  inUse: boolean
}

interface Order {
  id: number
  sessionId: number
  dishes: string[]
  comments: string
  isApproved: boolean
  isServed: boolean
  timeStamp: number
}

interface Session {
  id: number
  tableId: number
  secret: string
}

interface PopUp {
  text: string
  isError: boolean
}

interface RestaurantTable {
    id: number,
    tableNumber: number,
    restaurantId: number,
    isActive: boolean,
    inUse: boolean
}