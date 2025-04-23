import {User, users} from '@config/mock-data'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (
    username: string,
    password: string
  ) => Promise<{success: boolean; message?: string}>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: undefined,
      login: async (username: string, password: string) => {
        // Simple mock authentication
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
    }),
    {
      name: 'auth-storage',
    }
  )
)
