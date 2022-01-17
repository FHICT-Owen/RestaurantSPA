import { Restaurant } from '../classes'
import { setAuthHeader, showPopUp } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default class RestaurantDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async getAllRestaurants(): Promise<Restaurant[]> {
    const response = await axios.get(`${this.API_URL}/restaurant/`)
    return response.data
  }

  public static async createRestaurant (restaurant: Restaurant): Promise<Restaurant> {
    return await axios.post(`${this.API_URL}/restaurant/`, restaurant, setAuthHeader())
      .then((response: AxiosResponse<Restaurant>) => { 
        showPopUp(`Added ${restaurant.name}`, false)
        return Object.setPrototypeOf(response.data, Restaurant.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to add ${restaurant.name}`, true)
      })
  }

  public static async editRestaurant(restaurant: Restaurant) : Promise<Restaurant>{
    return await axios.put(`${this.API_URL}/restaurant/`, restaurant, setAuthHeader())
      .then((response: AxiosResponse<Restaurant>) => { 
        showPopUp(`Updated ${restaurant.id}`, false) 
        return Object.setPrototypeOf(response.data, Restaurant.prototype) 
      })      
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to update ${restaurant.id}`, true)
      })
  }

  public static async deleteRestaurant(restaurant: Restaurant) {
    await axios.delete(`${this.API_URL}/restaurant/${restaurant.id}`, setAuthHeader())
      .then(() => showPopUp(`Deleted ${restaurant.name}`, false))
      .catch(() => showPopUp(`Was unable to delete ${restaurant.name}`, true))
  }

  public static async setInUse(tableId: number, state:boolean): Promise<any> {
    return await axios.put(`${this.API_URL}/table/${tableId}/use?state=${state}`, false, setAuthHeader()).then(() => {
      showPopUp('Set table to active!', false)
      return true
    }).catch(()=>{
      showPopUp('Was unable to set table to active!', true)
      return false
    })      
  }
}
