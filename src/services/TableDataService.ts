import { showPopUp } from '@/utils'
import axios from 'axios'

export default class DishDataService {
  static RESTAURANT_API_URL = process.env.RESTAURANT_APP_URL;


  //FIX THIS
  public static async getAllTables(): Promise<Dish[]> {
    const response = await axios.get(`${this.RESTAURANT_API_URL}/table/`)
    return response.data
  }

  //FIX THIS
  public static async createTable(table: RestaurantTable) {
    await axios.post(`${this.RESTAURANT_API_URL}/table/`, table)
      // .then(() => showPopUp(table.id, 'added', false))
      // .catch(() => showPopUp(dish.name, 'added', true))
  }

  //DELETE ARRAY OF TABLES
  //TOGGLE TABLE

  public static async toggleTable(table: RestaurantTable) {
    await axios.put(`${this.RESTAURANT_API_URL}/table/${table.id}`, table)
      .then(() => showPopUp("Table " + table.id + 'updated', false))
      .catch(() => showPopUp("Table " + table.id + ' updated', true))
  }

  //REMOVE

  public static async deleteSelectedTables(selectedTables: RestaurantTable[]) {
    await axios.delete(`${this.RESTAURANT_API_URL}/tables/${selectedTables}`)
      .then(() => showPopUp('Selected tables deleted', false))
      .catch(() => showPopUp('Selected tables deleted', true))
  }
  //REMOVE
}
