import { Category, Order } from '@/classes'
import { setAuthHeader, showPopUp } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default class NotificationDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL
  public static async sendDish (order: Order) {
    await axios.post(`${this.API_URL}/notify/user-order-update`, order)
  }
}
