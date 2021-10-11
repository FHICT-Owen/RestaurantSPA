import { showPopUp } from '@/utils'
import axios from 'axios'

export default class CategoryDataService {
  static API_URL = process.env.VUE_APP_API_URL;

  public static async getAllCategories (): Promise<Category[]> {
    const result = await axios.get(`${this.API_URL}/categories/`)
    return result.data
  }

  public static async createCategory (category: Category) {
    await axios.post(`${this.API_URL}/categories/`, category)
      .then(() => showPopUp(category.name, 'added', false))
      .catch(() => showPopUp(category.name, 'added', true))
  }

  public static async editCategory(category: Category) {
    await axios.put(`${this.API_URL}/categories/${category.id}`, category)
      .then(() => showPopUp(category.name, 'updated', false))
      .catch(() => showPopUp(category.name, 'updated', true))
  }

  public static async deleteCategory(category: Category) {
    await axios.delete(`${this.API_URL}/categories/${category.id}`)
      .then(() => showPopUp(category.name, 'deleted', false))
      .catch(() => showPopUp(category.name, 'deleted', true))
  } 
}
