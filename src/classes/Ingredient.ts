export default class Ingredient {
	id!: number
	restaurantId: number
	name: string
	name_NL: string
	isAllergen: boolean
	isInStock: boolean
  
	constructor(restaurantId: number, name: string, name_NL: string, isAllergen: boolean) {
	  this.restaurantId = restaurantId
	  this.name = name
	  this.name_NL = name_NL
	  this.isAllergen = isAllergen
	  this.isInStock = false
	}
}