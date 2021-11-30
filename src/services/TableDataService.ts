import { setAuthHeader, showPopUp } from '@/utils'
import axios from 'axios'

export default class DishDataService {
  static RESTAURANT_API_URL = process.env.VUE_APP_PROXY_URL;


  //FIX THIS
  public static async getAllTables(): Promise<RestaurantTable[]> {
    const response = await axios.get(`${this.RESTAURANT_API_URL}/table/tables/1`, setAuthHeader())
    return response.data
  }

  //FIX THIS
  public static async createTable(table: RestaurantTable) {
    await axios.post(`${this.RESTAURANT_API_URL}/table/`, table, setAuthHeader())
    // .then(() => showPopUp(table.id, 'added', false))
    // .catch(() => showPopUp(dish.name, 'added', true))
  }

  //DELETE ARRAY OF TABLES
  //TOGGLE TABLE

  public static async toggleTable(table: RestaurantTable) {
    await axios.put(`${this.RESTAURANT_API_URL}/table/${table.id}`, table, setAuthHeader())
      .then(() => showPopUp('Table ' + table.id + 'updated', false))
      .catch(() => showPopUp('Table ' + table.id + ' updated', true))
  }

  //REMOVE

  public static async deleteSelectedTables(selectedTables: RestaurantTable[]) {
    await axios.delete(`${this.RESTAURANT_API_URL}/tables/${selectedTables}`, setAuthHeader())
      .then(() => showPopUp('Selected tables deleted', false))
      .catch(() => showPopUp('Selected tables deleted', true))
  }
  //REMOVE
}
