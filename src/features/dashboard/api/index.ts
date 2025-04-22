import {AxiosInstance} from 'axios'

class DashboardApi {
  api: AxiosInstance

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance
  }

  getDashboardMetrics = async () => this.api.get(`/taskflow/v1/dashboard`)
}

export default DashboardApi
