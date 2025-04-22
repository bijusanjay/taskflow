// src/stores/auth-store.ts
import { create } from 'zustand'

export interface UserData {
  name: string
  id: string
  email: string
  role: string
  actions: Array<string> | null
  orgId: string
  apiKey: string
}

interface AuthState {
  userData: UserData | null
  setUserData: (data: UserData) => void
  clearUserData: () => void
}

const useAuthStore = create<AuthState>(set => ({
  userData: null,
  setUserData: data => set({ userData: data }),
  clearUserData: () => set({ userData: null }),
}))

export default useAuthStore
