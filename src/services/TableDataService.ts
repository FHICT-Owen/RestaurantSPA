import { Table } from '@/classes'
import { setAuthHeader, showPopUp } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default class TableDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async getTable(tableId: number): Promise<Table> {
    const response = await axios.get(`${this.API_URL}/table/${tableId}`)
    return response.data
  }

  public static async getAllTables(currentRestaurant:number): Promise<Table[]> {
    const response = await axios.get(`${this.API_URL}/table/tables/${currentRestaurant}`)
    return response.data
  }

  public static async createTable (table: Table): Promise<Table> {
    return await axios.post(`${this.API_URL}/table/`, table, setAuthHeader())
      .then((response: AxiosResponse<Table>) => { 
        showPopUp(`Added ${table.tableNumber}`, false)
        return Object.setPrototypeOf(response.data, Table.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to add ${table.tableNumber}`, true)
      })
  }

  public static async editTable(table: Table): Promise<Table> {
    return await axios.put(`${this.API_URL}/table/`, table, setAuthHeader())
      .then((response: AxiosResponse<Table>) => { 
        showPopUp(`Updated ${table.tableNumber}`, false) 
        return Object.setPrototypeOf(response.data, Table.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp(`Was unable to update ${table.tableNumber}`, true)
      })
  }

  public static async setTableInUse(tableId: number): Promise<Table> {
    return await axios.put(`${this.API_URL}/table/inuse/${tableId}`)
      .then((response: AxiosResponse<Table>) => { 
        showPopUp('Updated table', false) 
        return Object.setPrototypeOf(response.data, Table.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp('Was unable to update table', true)
        throw new Error('')
      })
  }

  public static async deleteTable(table: Table) {
    await axios.delete(`${this.API_URL}/table/${table.id}`, setAuthHeader())
      .then(() => showPopUp('Table removed successfully', false))
      .catch(() => showPopUp('Was unable to remove table', true))
  }
}
