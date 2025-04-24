import useAppStore from '@/stores/app-store'
import { createApiInstance } from '@utils/helper'

export const resetAllStores = () => {
  useAppStore.setState({
    apiInstance: createApiInstance(),
    themeMode: 'light',
    organizations: [],
    activeOrganization: undefined,
  })
}
