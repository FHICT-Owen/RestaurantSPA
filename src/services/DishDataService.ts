import store from '@/store'
import axios from 'axios'

export default class DishDataService {
  static API_URL = process.env.VUE_APP_API_URL;

  public static async getAllDishes(): Promise<Dish[]> {
    const response = await axios.get(`${this.API_URL}/dish/`)
    return response.data
  }

  public static async createDish(dish: Dish) {
    await axios.post(`${this.API_URL}/dish/`, dish)
      .then(() => store.dispatch('showPopUp', `${dish.name} successfully added!`))
      .catch(() =>store.dispatch('showPopUp', 'Error occurred'))
  }

  public static async editDish(dish: Dish) {
    await axios.put(`${this.API_URL}/dish/${dish.id}`, dish)
      .then(() => store.dispatch('showPopUp', `${dish.name} successfully updated!`))
      .catch(() =>store.dispatch('showPopUp', 'Error occurred'))
  }

  public static async deleteDish(dish: Dish) {
    await axios.delete(`${this.API_URL}/dish/${dish.id}`)
      .then(() => store.dispatch('showPopUp', `${dish.name} successfully deleted!`))
      .catch(() =>store.dispatch('showPopUp', 'Error occurred'))
  }
}
