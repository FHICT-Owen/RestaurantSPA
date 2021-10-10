import store from '@/store'
import axios from 'axios'

export default class CategoryDataService {
  static API_URL = process.env.VUE_APP_API_URL;

  public static async getAllCategories (): Promise<Category[]> {
    const result = await axios.get(`${this.API_URL}/categories/`)
    return result.data
  }

  public static async createCategory (category: Category) {
    await axios.post(`${this.API_URL}/categories/`, category)
      .then(() => store.dispatch('showPopUp', `${category.name} successfully added!`))
      .catch(() => store.dispatch('showPopUp', 'Error occurred'))
  }

  public static async editCategory(category: Category) {
    await axios.put(`${this.API_URL}/categories/${category.id}`, category)
      .then(() => store.dispatch('showPopUp', `${category.name} successfully updated!`))
      .catch(() => store.dispatch('showPopUp', 'Error occurred'))
  }

  public static async deleteCategory(category: Category) {
    await axios.delete(`${this.API_URL}/categories/${category.id}`)
      .then(() => store.dispatch('showPopUp', `${category.name} successfully deleted!`))
      .catch(() => store.dispatch('showPopUp', 'Error occurred'))
  } 
}
