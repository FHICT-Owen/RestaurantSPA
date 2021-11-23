import store from '@/store'
import { showPopUp } from '@/utils'
import axios from 'axios'

export default class IngredientDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async getAllIngredients(): Promise<Ingredient[]> {
    const response = await axios.get(`${this.API_URL}/ingredient/`, {
      headers: { Authorization: `Bearer ${store.state.apiToken}`}
    })
    return response.data
  }

  public static async createIngredient(ingredient: Ingredient) {
    await axios.post(`${this.API_URL}/ingredient/`, ingredient, {
      headers: { Authorization: `Bearer ${store.state.apiToken}`}
    })
      .then(() => showPopUp(`Added ${ingredient.name}`, false))
      .catch(() => showPopUp(`Unable to add ${ingredient.name}`, true))
  }

  public static async deleteIngredient(ingredient: Ingredient) {
    await axios.delete(`${this.API_URL}/ingredient/${ingredient.id}`, {
      headers: { Authorization: `Bearer ${store.state.apiToken}`}
    })
      .then(() => showPopUp(`Deleted ${ingredient.name}`, false))
      .catch(() => showPopUp(`Unable to remove ${ingredient.name}`, true))
  }
}
