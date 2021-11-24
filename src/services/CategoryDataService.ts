import store from '@/store'
import { showPopUp } from '@/utils'
import axios from 'axios'

export default class CategoryDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL

  public static async getAllCategories (): Promise<Category[]> {
    const result = await axios.get(`${this.API_URL}/categories/`)
    return result.data
  }

  public static async createCategory (category: Category) {
    console.log(store.state.apiToken)
    await axios.post(`${this.API_URL}/categories/`, category, {
      headers: { Authorization: `Bearer ${store.state.apiToken}`}
    })
      .then(() => showPopUp(`Added ${category.name}`, false))
      .catch(() => showPopUp(`Was unable to add ${category.name}`, true))
  }

  public static async editCategory(category: Category) {
    await axios.put(`${this.API_URL}/categories/${category.id}`, category, {
      headers: { Authorization: `Bearer ${store.state.apiToken}`}
    })
      .then(() => showPopUp(`Updated ${category.name}`, false))
      .catch(() => showPopUp(`Was unable to update ${category.name}`, true))
  }

  public static async deleteCategory(category: Category) {
    await axios.delete(`${this.API_URL}/categories/${category.id}`, {
      headers: { Authorization: `Bearer ${store.state.apiToken}`}
    })
      .then(() => showPopUp(`Deleted ${category.name}`, false))
      .catch(() => showPopUp(`Was unable to delete ${category.name}`, true))
  } 
}
