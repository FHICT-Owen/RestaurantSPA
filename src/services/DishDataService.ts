import axios from 'axios'

export default class DishDataService {
  static API_URL = process.env.VUE_APP_API_URL;

  public static async getAllDishes (): Promise<Dish[]> {
    const result = await axios.get(`${this.API_URL}/dish/`)
    return result.data
  }

  public static async createDish (dish: Dish) {
    await axios.post(`${this.API_URL}/dish/`, dish)
  }
}
