import { Order } from '../classes'
import { setAuthHeader, showPopUp } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default class OrderDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async getAllOrders(): Promise<Order[]> {
    const response = await axios.get(`${this.API_URL}/order/`, setAuthHeader())
    return response.data
  }

  public static async createOrder (order: Order): Promise<Order> {
    return await axios.post(`${this.API_URL}/order/`, order, setAuthHeader())
      .then((response: AxiosResponse<Order>) => { 
        showPopUp(`Added ${order.id}`, false)
        return Object.setPrototypeOf(response.data, Order.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to add ${order.id}`, true)
      })
  }

  public static async editOrder(order: Order): Promise<Order>{
    return await axios.put(`${this.API_URL}/order/`, order, setAuthHeader())
      .then((response: AxiosResponse<Order>) => { 
        showPopUp(`Updated ${order.id}`, false) 
        return Object.setPrototypeOf(response.data, Order.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to update ${order.id}`, true)
      })
  }

  //   public static async deleteOrderById(dish: Dish) {
  //     const token = computed(() => store.state.apiToken)
  //     await axios.delete(`${this.API_URL}/dish/${dish.id}`, {
  //       headers: { Authorization: `Bearer ${token.value}`}
  //     })
  //       .then(() => showPopUp(`Deleted ${dish.name}`, false))
  //       .catch(() => showPopUp(`Was unable to delete ${dish.name}`, true))
  //   }

  //   public static async removeOrdersBySessionId(dish: Dish) {
  //     const token = computed(() => store.state.apiToken)
  //     await axios.delete(`${this.API_URL}/dish/${dish.id}`, {
  //       headers: { Authorization: `Bearer ${token.value}`}
  //     })
  //       .then(() => showPopUp(`Deleted ${dish.name}`, false))
  //       .catch(() => showPopUp(`Was unable to delete ${dish.name}`, true))
  //   }
}
