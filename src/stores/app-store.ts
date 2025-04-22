import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {createApiInstance} from '@/utils/helper'
import Api from '@lib/api-client'

export interface ApiInstance {
  client: Api
}

export interface Organization {
  name: string
  value: string
}

interface AppState {
  apiInstance: ApiInstance
  themeMode: 'light' | 'dark'
  setThemeMode: (mode: 'light' | 'dark') => void
  organizations: Organization[]
  setOrganizations: (orgs: Organization[]) => void
  activeOrganization: string | undefined
  setActiveOrganization: (org: string) => void
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      apiInstance: createApiInstance(),
      themeMode: 'light',
      setThemeMode: (mode) => set({themeMode: mode}),
      organizations: [],
      setOrganizations: (orgs) => set({organizations: orgs}),
      activeOrganization: undefined,
      setActiveOrganization: (org) => set({activeOrganization: org}),
    }),
    {
      name: 'active-organization-store',
      partialize: (state) => ({activeOrganization: state.activeOrganization}),
    }
  )
)

export default useAppStore
