import { AxiosInstance } from 'axios'

class UserApi {
  api: AxiosInstance

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance
  }

  getUsers = async () => {
     try {
          const users = await this.api.get<any>(`https://api.escuelajs.co/api/v1/users`)
          return { data: users.data }
        } catch (error) {
          return { err: 'Failed to fetch users' }
        }
  }    
}

export default UserApi
