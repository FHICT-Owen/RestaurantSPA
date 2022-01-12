import { Category } from '@/classes'
import { setAuthHeader, showPopUp } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default class CategoryDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL

  public static async getAllCategories (): Promise<Category[]> {
    const result = await axios.get(`${this.API_URL}/category/`)
    return result.data
  }

  public static async createCategory (category: Category): Promise<Category> {
    return await axios.post(`${this.API_URL}/category/`, category, setAuthHeader())
      .then((response: AxiosResponse<Category>) => { 
        showPopUp(`Added ${category.name}`, false)
        return Object.setPrototypeOf(response.data, Category.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to add ${category.name}`, true)
      })
  }

  public static async editCategory(category: Category): Promise<Category> {
    return await axios.put(`${this.API_URL}/category/`, category, setAuthHeader())
      .then((response: AxiosResponse<Category>) => { 
        showPopUp(`Updated ${category.name}`, false) 
        return Object.setPrototypeOf(response.data, Category.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to update ${category.name}`, true)
      })
  }

  public static async deleteCategory(category: Category) {
    await axios.delete(`${this.API_URL}/category/${category.id}`, setAuthHeader())
      .then(() => showPopUp(`Deleted ${category.name}`, false))
      .catch(() => showPopUp(`Was unable to delete ${category.name}`, true))
  }
}
