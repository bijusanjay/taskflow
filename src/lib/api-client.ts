import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
export type { AxiosError } from 'axios'
import AuthApi from '@features/auth/api'
import DashboardApi from '@features/dashboard/api'
import UserApi from '@features/task-bug/api'

export class Api {
  apiInstance: AxiosInstance
  authApi: AuthApi
  dashboardApi: DashboardApi
  userApi: UserApi

  constructor(config: AxiosRequestConfig) {
    this.apiInstance = axios.create(config)
    this.authApi = new AuthApi(this.apiInstance)
    this.dashboardApi = new DashboardApi(this.apiInstance)
    this.userApi = new UserApi(this.apiInstance)
    this.apiInstance?.interceptors.request.use(
      function (config) {
        try {
          // Write custom logic
        } catch (error) {
          console.error('Error in request interceptor:', error)
        }

        return config
      },
      function (error) {
        // Handle request error
        return Promise.reject(error)
      }
    )
    this.apiInstance?.interceptors.response.use(
      function (response) {
        return response
      },
      async function (error) {
        // Handle custom logic

        return Promise.reject(error)
      }
    )
  }
}

export default Api
