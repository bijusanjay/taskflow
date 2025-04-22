import useAppStore from '@/stores/app-store'
import useAuthStore from '@/stores/auth-store'
import { createApiInstance } from '@utils/helper'

export const resetAllStores = () => {
  // Reset auth store
  useAuthStore.setState({
    userData: null,
  })

  // Reset app store to initial state
  useAppStore.setState({
    apiInstance: createApiInstance(),
    themeMode: 'light',
    organizations: [],
    activeOrganization: undefined,
  })
}
