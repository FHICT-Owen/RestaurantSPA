import { showPopUp } from '@/utils'
import axios from 'axios'

export default class DishDataService {
  static API_URL = process.env.VUE_APP_MENU_SERVICE_URL;

  public static async getAllDishes(): Promise<Dish[]> {
    const response = await axios.get(`${this.API_URL}/dish/`)
    return response.data
  }

  public static async createDish(dish: Dish) {
    await axios.post(`${this.API_URL}/dish/`, dish)
      .then(() => showPopUp(`Added ${dish.name}`, false))
      .catch(() => showPopUp(`Was unable to add ${dish.name}`, true))
  }

  public static async editDish(dish: Dish) {
    await axios.put(`${this.API_URL}/dish/${dish.id}`, dish)
      .then(() => showPopUp(`Updated ${dish.name}`, false))
      .catch(() => showPopUp(`Was unable to update ${dish.name}`, true))
  }

  public static async deleteDish(dish: Dish) {
    await axios.delete(`${this.API_URL}/dish/${dish.id}`)
      .then(() => showPopUp(`Deleted ${dish.name}`, false))
      .catch(() => showPopUp(`Was unable to delete ${dish.name}`, true))
  }
}
