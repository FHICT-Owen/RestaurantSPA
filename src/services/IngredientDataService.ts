import { Ingredient } from '@/classes'
import { setAuthHeader, showPopUp } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default class IngredientDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async getAllIngredients(): Promise<Ingredient[]> {
    const response = await axios.get(`${this.API_URL}/ingredient/`)
    return response.data
  }

  public static async createIngredient (ingredient: Ingredient): Promise<Ingredient> {
    return await axios.post(`${this.API_URL}/ingredient/`, ingredient, setAuthHeader())
      .then((response: AxiosResponse<Ingredient>) => { 
        showPopUp(`Added ${ingredient.name}`, false)
        return Object.setPrototypeOf(response.data, Ingredient.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to add ${ingredient.name}`, true)
      })
  }

  public static async editIngredient(ingredient: Ingredient): Promise<Ingredient> {
    return await axios.put(`${this.API_URL}/ingredient/`, ingredient, setAuthHeader())
      .then((response: AxiosResponse<Ingredient>) => { 
        showPopUp(`Updated ${ingredient.name}`, false) 
        return Object.setPrototypeOf(response.data, Ingredient.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to update ${ingredient.name}`, true)
      })
  }

  public static async deleteIngredient(ingredient: Ingredient) {
    await axios.delete(`${this.API_URL}/ingredient/${ingredient.id}`, setAuthHeader())
      .then(() => showPopUp(`Deleted ${ingredient.name}`, false))
      .catch(() => showPopUp(`Unable to remove ${ingredient.name}`, true))
  }
}
