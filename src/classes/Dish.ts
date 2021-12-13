export default class Dish implements Dish {
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
}