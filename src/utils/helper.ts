import { Api } from '@/lib/api-client'
import { ApiInstance } from '@/stores/app-store'
import { BASE_URL } from '@lib/env'

export const createApiInstance = (): ApiInstance => {
  const client = new Api({ baseURL: BASE_URL })
  return { client }
}

export const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  return `${hours.toString().padStart(2, '0')}:${(minutes % 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
}
