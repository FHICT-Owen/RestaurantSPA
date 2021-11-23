import store from '@/store'
import { showPopUp } from '@/utils'
import { computed } from '@vue/runtime-core'
import axios from 'axios'

export default class OrderDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async getAllOrders(): Promise<Order[]> {
    const response = await axios.get(`${this.API_URL}/order/`, {
      headers: { Authorization: `Bearer ${store.state.apiToken}`}
    })
    return response.data
  }

//   public static async createOrder(order: Order) {
//     const token = computed(() => store.state.apiToken)
//     await axios.post(`${this.API_URL}/dish/`, dish, {
//       headers: { Authorization: `Bearer ${token.value}`}
//     })
//       .then(() => showPopUp(`Added ${dish.name}`, false))
//       .catch(() => showPopUp(`Was unable to add ${dish.name}`, true))
//   }

//   public static async approveOrder(dish: Dish) {
//     const token = computed(() => store.state.apiToken)
//     await axios.put(`${this.API_URL}/dish/${dish.id}`, dish, {
//       headers: { Authorization: `Bearer ${token.value}`}
//     })
//       .then(() => showPopUp(`Updated ${dish.name}`, false))
//       .catch(() => showPopUp(`Was unable to update ${dish.name}`, true))
//   }

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
