export class Session implements Session {
  id: number
  tableId: number
  secret: string

  constructor(id: number, tableId: number, secret: string) {
    this.id = id
    this.tableId = tableId
    this.secret = secret
  }
}

export class Table implements Table {
  id: number
  tableNumber: number
  restaurantId: number
  isActive: boolean
  inUse: boolean

  constructor(id: number, tableNumber: number, restaurantId: number, isActive: boolean, inUse: boolean) {
    this.id = id
    this.tableNumber = tableNumber
    this.restaurantId = restaurantId
    this.isActive = isActive
    this.inUse = inUse
  }
}