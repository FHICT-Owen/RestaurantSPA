import { setAuthHeader, showPopUp } from '@/utils'
import axios from 'axios'

export default class CategoryDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL

  public static async getAllCategories (): Promise<Category[]> {
    const result = await axios.get(`${this.API_URL}/categories/`)
    return result.data
  }

  public static async createCategory (category: Category) {
    await axios.post(`${this.API_URL}/categories/`, category, setAuthHeader())
      .then(() => showPopUp(`Added ${category.name}`, false))
      .catch(() => showPopUp(`Was unable to add ${category.name}`, true))
  }

  public static async editCategory(category: Category) {
    await axios.put(`${this.API_URL}/categories/${category.id}`, category, setAuthHeader())
      .then(() => showPopUp(`Updated ${category.name}`, false))
      .catch(() => showPopUp(`Was unable to update ${category.name}`, true))
  }

  public static async deleteCategory(category: Category) {
    await axios.delete(`${this.API_URL}/categories/${category.id}`, setAuthHeader())
      .then(() => showPopUp(`Deleted ${category.name}`, false))
      .catch(() => showPopUp(`Was unable to delete ${category.name}`, true))
  } 
}
