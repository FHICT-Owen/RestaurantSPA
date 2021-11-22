import store from '@/store'
import { showPopUp } from '@/utils'
import { computed } from '@vue/runtime-core'
import axios from 'axios'

export default class RestaurantDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async getTable(tableId: number): Promise<Table> {
    const token = computed(() => store.state.apiToken)
    const response = await axios.get(`${this.API_URL}/table/${tableId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    return response.data
  }

  public static async setInUse(tableId: number, state:boolean): Promise<any> {
    const token = computed(() => store.state.apiToken)
    return await axios.put(`${this.API_URL}/table/${tableId}/use?state=${state}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(() => {
      showPopUp('Set table to active!', false)
      return true
    }).catch(()=>{
      showPopUp('Was unable to set table to active!', true)
      return false
    })      
  }
}
