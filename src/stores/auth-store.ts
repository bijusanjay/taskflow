import {User, users} from '@config/mock-data'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface AuthState {
  user: User | null
  isAuthenticated: boolean | undefined
  login: (
    username: string,
    password: string
  ) => Promise<{success: boolean; message?: string}>
  logout: () => void
  setUserData: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: undefined,
      login: async (username: string, password: string) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        )

        if (user) {
          set({user, isAuthenticated: true})
          return {success: true}
        }

        return {
          success: false,
          message: 'Invalid username or password',
        }
      },
      logout: () => {
        set({user: null, isAuthenticated: false})
      },
      setUserData: (user: User) => {
        set({user, isAuthenticated: true})
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
