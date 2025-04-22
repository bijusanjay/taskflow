import {AxiosInstance} from 'axios'

class UserApi {
  api: AxiosInstance

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance
  }
}

export default UserApi
