import { AxiosInstance } from 'axios'
import { LoginResponse } from '../types'

class AuthApi {
  api: AxiosInstance

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance
  }

  login = async (payload: { email: string; password: string }) =>
    this.api.post<LoginResponse>(`/taskflow/v1/login`, payload)
}

export default AuthApi
