export interface UserRegister {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  address: string
}

export interface User {
  id: number
  username: string
  email: string
  roleId: number | null
}
