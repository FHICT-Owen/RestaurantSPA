import { Session } from '../classes'
import { setAuthHeader, showPopUp } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default class SessionDataService {
  static API_URL = process.env.VUE_APP_PROXY_URL;

  public static async createSession (session: Session): Promise<Session> {
    return await axios.post(`${this.API_URL}/session/`, session)
      .then((response: AxiosResponse<Session>) => { 
        showPopUp('Added session', false)
        return Object.setPrototypeOf(response.data, Session.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp('Was unable to add session', true)
      })
  }

  public static async getSessionByCookie(secret: string): Promise<Session> {
    return await axios.get(`${this.API_URL}/session/sessionbycookie?cookie=${secret}`)
      .then((response: AxiosResponse<Session>) => { 
        showPopUp('Added session', false)
        return Object.setPrototypeOf(response.data, Session.prototype) 
      })
      .catch((error: AxiosError) => {
        showPopUp('Was unable to get session with cookie', true)
        throw new Error()
      })
  } 

  public static async getAllSessions(): Promise<Session[]> {
    const response = await axios.get(`${this.API_URL}/session`, setAuthHeader())
    return response.data
  }

  public static async deleteSession(sessionId: string) {
    await axios.delete(`${this.API_URL}/session/${sessionId}`)
      .then(() => showPopUp('Session removed successfully', false))
      .catch(() => showPopUp('Was unable to remove session', true))
  }
}