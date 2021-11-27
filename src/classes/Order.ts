export default class Order implements Order {
    id!: number
    sessionId!: number
    dishes!: string[]
    comments!: string
    isApproved!: boolean
    isServed!: boolean

    constructor(sessionId: number, dishes: string[], comments: string, isApproved: boolean, isServed: boolean) {
      this.sessionId = sessionId
      this.dishes = dishes
      this.comments = comments
      this.isApproved = isApproved
      this.isServed = isServed
    }
}