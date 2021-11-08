import { showPopUp } from '@/utils'
import axios from 'axios'

export default class RestaurantDataService {
  static API_URL = process.env.VUE_APP_RESTAURANT_SERVICE_URL;

  public static async getTable(tableId: number): Promise<Table> {
    const response = await axios.get(`${this.API_URL}/table/${tableId}`)
    return response.data
  }

  public static async setInUse(tableId: number): Promise<any> {
    return await axios.put(`${this.API_URL}/table/${tableId}/use`, true).then(response => {
      showPopUp('Set table to active!', false)
      return response.data
    }).catch(()=>{
      showPopUp('Was unable to set table to active!', true)
      return false
    })      
  }
}
