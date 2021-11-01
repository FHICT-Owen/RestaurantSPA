import { showPopUp } from '@/utils'
import axios from 'axios'

export default class IngredientDataService {
  static API_URL = process.env.VUE_APP_INVENTORY_SERVICE_URL;

  public static async getAllIngredients(): Promise<Ingredient[]> {
    const response = await axios.get(`${this.API_URL}/ingredient/`)
    return response.data
  }

  public static async createIngredient(ingredient: Ingredient) {
    await axios.post(`${this.API_URL}/ingredient/`, ingredient)
      .then(() => showPopUp(ingredient.name, 'added', false))
      .catch(() => showPopUp(ingredient.name, 'added', true))
  }

  public static async deleteIngredient(ingredient: Ingredient) {
    await axios.delete(`${this.API_URL}/ingredient/${ingredient.id}`)
      .then(() => showPopUp(ingredient.name, 'deleted', false))
      .catch(() => showPopUp(ingredient.name, 'deleted', true))
  }
}
