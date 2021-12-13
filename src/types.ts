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
  prize: number
  image: string
}

interface Ingredient {
  id: number
  name: string
  name_NL: string
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
  isCanceled: boolean
  isBeingPrepared: boolean
  isReady: boolean
  isArchived: boolean
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