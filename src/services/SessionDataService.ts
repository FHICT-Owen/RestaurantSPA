import store from '@/store'
import { Session } from '@/classes'
import { showPopUp } from '@/utils'
import { computed } from '@vue/runtime-core'
import axios from 'axios'

export default class SessionDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async createSession(session: Session): Promise<Boolean> {
    const token = computed(() => store.state.apiToken)
    return await axios.post(`${this.API_URL}/session/`, session).then(response => {
      showPopUp('Session created successfully!', false)
      return true
    }).catch(err => {
      showPopUp('Was unable to create session!', true)
      console.log(err)
      return false
    })
  }

  public static async getSessionByCookie(secret: string): Promise<Session> {
    const token = computed(() => store.state.apiToken)
    try{
      return await axios.get(`${this.API_URL}/session/sessionbycookie?cookie=${secret}`, {
        headers: { Authorization: `Bearer ${token}`}
      }).then(response => {
        return response.data
      })
    } catch {
      return new Session(0,0,'')
    }
  }

  public static async removeSession(tableId: number): Promise<Boolean> {
    const token = computed(() => store.state.apiToken)
    return await axios.delete(`${this.API_URL}/session/sessionbytable/${tableId}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(() => {
      showPopUp('Session removed successfully!', false)
      return true
    }).catch(err => {
      showPopUp('Was unable to remove session!', true)
      console.log(err)
      return false
    })
  }
}
