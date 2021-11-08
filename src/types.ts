interface Category {
    id: number,
    name: string
}

interface Dish {
    id: number,
    name: string,
    description: string,
    category: string,
    ingredients: string[]
    image: string,
}

interface Ingredient {
    id: number,
    name: string,
    isAllergen: boolean
}

interface Table {
  id: number,
  tableNumber: number,
  restaurantId: number,
  isActive: boolean,
  inUse: boolean
}

interface Session {
  id: number,
  tableId: number,
  secret: string
}

interface PopUp {
    text: string
    isError: boolean
}
