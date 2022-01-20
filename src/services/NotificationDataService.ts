import { Order } from '@/classes'
import axios from 'axios'

export default class NotificationDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL
  
  public static async notifyCustomer (order: Order) {
    await axios.post(`${this.API_URL}/notify/user-order-update`, order)
  }

  public static async notifyWaiter (sessionId: string) {
    await axios.post(`${this.API_URL}/notify/waiter-table-update/${sessionId}`)
  }

  public static async endUserSession (sessionId: string) {
    await axios.post(`${this.API_URL}/notify/end-user-session/${sessionId}`)
  }
}
