export default class Category {
  id!: number
  name: string
  name_NL: string

  constructor(name: string, name_NL: string) {
	  this.name = name
	  this.name_NL = name_NL
  }
}