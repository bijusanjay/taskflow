import {resetAllStores} from '@stores/reset-store'

export const decodeJwt = (token: string): string => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
}

export const logout = async () => {
  resetAllStores()
  localStorage?.clear()
}
