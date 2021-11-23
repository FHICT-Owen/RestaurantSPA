import store from '@/store'
import { showPopUp } from '@/utils'
import { computed } from '@vue/runtime-core'
import axios from 'axios'

export default class RestaurantDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async getTable(tableId: number): Promise<Table> {
    const response = await axios.get(`${this.API_URL}/table/${tableId}`, {
      headers: { Authorization: `Bearer ${store.state.apiToken}`}
    })
    return response.data
  }

  public static async setInUse(tableId: number, state:boolean): Promise<any> {
    return await axios.put(`${this.API_URL}/table/${tableId}/use?state=${state}`, {
      headers: { Authorization: `Bearer ${store.state.apiToken}`}
    }).then(() => {
      showPopUp('Set table to active!', false)
      return true
    }).catch(()=>{
      showPopUp('Was unable to set table to active!', true)
      return false
    })      
  }
}
