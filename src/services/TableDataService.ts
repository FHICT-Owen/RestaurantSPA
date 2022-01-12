import { Table } from '@/classes'
import { setAuthHeader, showPopUp } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default class TableDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async getTable(tableId: number): Promise<Table> {
    const response = await axios.get(`${this.API_URL}/table/${tableId}`, setAuthHeader())
    return response.data
  }

  public static async getAllTables(): Promise<Table[]> {
    const response = await axios.get(`${this.API_URL}/table/tables/1`, setAuthHeader())
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

  public static async deleteTable(selectedTable: Table): Promise<Boolean>{
    await axios.delete(`${this.API_URL}/table/${selectedTable.id}`, setAuthHeader())
      .then(() => {
        showPopUp('Selected table removed', false)
      })
      .catch(() => {
        showPopUp('Selected table not removed', true)
        return false
      })
    return true
  }
}
