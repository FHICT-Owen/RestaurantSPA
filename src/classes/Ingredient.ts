export default class Order implements Ingredient {
	id!: number
	name: string
	name_NL: string
	isAllergen: boolean
  
	constructor(name: string, name_NL: string) {
	  this.name = name
	  this.name_NL = name_NL
	  this.isAllergen = false
	}
}