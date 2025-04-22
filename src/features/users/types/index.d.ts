export interface Data {
  users: User[]
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  last_seen: string
  is_active: boolean
}
