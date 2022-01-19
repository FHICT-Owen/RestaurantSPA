import { Category, Order } from '@/classes'
import { setAuthHeader, showPopUp } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default class NotificationDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL
  public static async notifyCustomer (order: Order) {
    await axios.post(`${this.API_URL}/notify/user-order-update`, order)
      .then((response: AxiosResponse<Order>) => { 
        showPopUp(`Updated ${order.id}`, false) 
      })
      .catch((error: AxiosError) => {
        console.log('wdjiwaojdoiawjiodoijoi')
        showPopUp(`Was unable to update ${order.id}`, true)
      })
  }
}
