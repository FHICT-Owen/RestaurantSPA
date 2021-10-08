import axios from 'axios'

export default class CategoryDataService {
  static API_URL = process.env.VUE_APP_API_URL;

  public static async getAllCategories (): Promise<Category[]> {
    const result = await axios.get(`${this.API_URL}/categories/`)
    return result.data
  }

  public static async createCategory (category: Category) {
    await axios.post(`${this.API_URL}/categories/`, category)
  }

  // public async deleteAllCategory(): Promise<void> {
  //     await axios.delete(`${this.API_URL}/outcome/`)
  // }

  // public async deleteCategoryById(id: number): Promise<void> {
  //     await axios.delete(`${this.API_URL}/outcome/${id}`)
  // }

  // public async updateCategory(outcome: Category): Promise<void> {
  //     const result = await axios.put(`${this.API_URL}/outcome/, outcome`)
  //     return result.data;
  // }
}
