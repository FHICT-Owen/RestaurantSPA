export default class Order implements Order {
  id!: number
  sessionId: number
  dishes: string[]
  comments: string
  isApproved: boolean
  isServed: boolean
  timeStamp: number

  constructor(sessionId: number, dishes: string[], comments: string, isApproved: boolean, isServed: boolean) {
    this.sessionId = sessionId
    this.dishes = dishes
    this.comments = comments
    this.isApproved = isApproved
    this.isServed = isServed
    this.timeStamp = Date.now()
  }
}