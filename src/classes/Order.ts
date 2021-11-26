export default class Order implements Order {
    id!: number
    sessionId!: number
    dishes!: string[]
    comments!: string
    isApproved!: boolean
    isServed!: boolean
}