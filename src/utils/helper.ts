import { Api } from '@/lib/api-client'
import { ApiInstance } from '@/stores/app-store'
import { BASE_URL } from '@lib/env'

export const createApiInstance = (): ApiInstance => {
  const client = new Api({ baseURL: BASE_URL })
  return { client }
}
