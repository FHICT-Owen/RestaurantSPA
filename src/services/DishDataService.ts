import { Dish } from '@/classes'
import { setAuthHeader, showPopUp } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default class DishDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async getAllDishes(): Promise<Dish[]> {
    const response = await axios.get(`${this.API_URL}/dish/`)
    return response.data
  }

  public static async createDish (dish: Dish): Promise<Dish> {
    return await axios.post(`${this.API_URL}/dish/`, dish, setAuthHeader())
      .then((response: AxiosResponse<Dish>) => { 
        showPopUp(`Added ${dish.name}`, false)
        return Object.setPrototypeOf(response.data, Dish.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to add ${dish.name}`, true)
      })
  }

  public static async editDish(dish: Dish): Promise<Dish> {
    return await axios.put(`${this.API_URL}/dish/`, dish, setAuthHeader())
      .then((response: AxiosResponse<Dish>) => { 
        showPopUp(`Updated ${dish.name}`, false) 
        return Object.setPrototypeOf(response.data, Dish.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to update ${dish.name}`, true)
      })
  }

  public static async deleteDish(dish: Dish) {
    await axios.delete(`${this.API_URL}/dish/${dish.id}`, setAuthHeader())
      .then(() => showPopUp(`Deleted ${dish.name}`, false))
      .catch(() => showPopUp(`Was unable to delete ${dish.name}`, true))
  }
}
