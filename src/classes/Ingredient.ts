export default class Order implements Ingredient {
	id!: number
	name: string
	isAllergen: boolean
  
	constructor(name: string) {
	  this.name = name
	  this.isAllergen = false
	}
}