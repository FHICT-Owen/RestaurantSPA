export class Session implements Session {
  id: number
  tableId: number
  secret: string

  constructor(id: number, tableId: number, secret: string) {
    this.id = id
    this.tableId = tableId
    this.secret = secret
  }
}

export class Table implements Table {
  id: number
  tableNumber: number
  restaurantId: number
  isActive: boolean
  inUse: boolean

  constructor(id: number, tableNumber: number, restaurantId: number, isActive: boolean, inUse: boolean) {
    this.id = id
    this.tableNumber = tableNumber
    this.restaurantId = restaurantId
    this.isActive = isActive
    this.inUse = inUse
  }
}

export class Category {
  id!: number
  name: string
  name_NL: string

  constructor(name: string, name_NL: string) {
	  this.name = name
	  this.name_NL = name_NL
  }
}

export class Dish {
  id!: number
  name!: string
  name_NL!: string
  description!: string
  description_NL!: string
  category!: string
  dietaryRestrictions!: string[]
  ingredients!: string[]
  prize!: string
  image!: string

  // constructor(name: string, name_NL: string, description: string, description_NL: string,  category: string,  dietaryRestrictions: string[],  ingredients: string[],  prize: number, image: string)
  // {
  //   this.name = name
  //   this.name_NL = name_NL
  //   this.description = description
  //   this.description_NL = description_NL
  //   this.category = category
  //   this.dietaryRestrictions = dietaryRestrictions
  //   this.ingredients = ingredients
  //   this.prize = prize
  //   this.image = image
  // }
}

export class Ingredient {
	id: number
	restaurantId: number
	name: string
	name_NL: string
	isAllergen: boolean
	isInStock: boolean
  
	constructor(id: number, restaurantId: number, name: string, name_NL: string, isAllergen: boolean, isInStock: boolean) {
	  this.id = id
	  this.restaurantId = restaurantId
	  this.name = name
	  this.name_NL = name_NL
	  this.isAllergen = isAllergen
	  this.isInStock = isInStock
	}
}

export class Order {
  id!: number
  sessionId: number
  dishes: string[]
  comments: string
  orderState: OrderState
  timeStamp: number

  constructor(sessionId: number, dishes: string[], comments: string, orderState:OrderState) {
    this.sessionId = sessionId
    this.dishes = dishes
    this.comments = comments
    this.orderState = orderState
    this.timeStamp = Date.now()
  }
}

export class Restaurant {
  id!: number
  name: string

  constructor(name: string) {
    this.name = name
  }
}
