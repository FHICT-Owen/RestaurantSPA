export default class Order {
  id!: number
  sessionId: number
  dishes: string[]
  comments: string
  isApproved: boolean
  isCanceled: boolean
  isBeingPrepared: boolean
  isReady: boolean
  isArchived: boolean
  timeStamp: number

  constructor(sessionId?: number, dishes?: string[], comments?: string) {
    this.sessionId = sessionId || 0
    this.dishes = dishes || []
    this.comments = comments || ''
    this.isApproved = false
    this.isCanceled = false
    this.isBeingPrepared = false
    this.isReady = false
    this.isArchived = false
    this.timeStamp = Date.now()
  }
}