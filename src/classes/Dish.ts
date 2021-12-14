export default class Dish {
  id!: number
  name!: string
  name_NL!: string
  description!: string
  description_NL!: string
  category!: string
  dietaryRestrictions!: string[]
  ingredients!: string[]
  prize!: number
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