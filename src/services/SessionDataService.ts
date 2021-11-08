import { Session } from '@/classes'
import { showPopUp } from '@/utils'
import axios from 'axios'

export default class SessionDataService {
  static API_URL = process.env.VUE_APP_SESSION_SERVICE_URL;

  public static async createSession(session: Session): Promise<any> {
    return await axios.post(`${this.API_URL}/session/`, session).then(response => {
      showPopUp('Session created successfully!', false)
      return response.data.id
    }).catch(err => {
      showPopUp('Was unable to create session!', true)
      console.log(err)
      return false
    })
  }

  public static async removeSession(sessionId: number): Promise<any> {
    return await axios.delete(`${this.API_URL}/session/${sessionId}`).then(() => {
      showPopUp('Session removed successfully!', false)
      return true
    }).catch(err => {
      showPopUp('Was unable to remove session!', true)
      console.log(err)
      return false
    })
  }
}
