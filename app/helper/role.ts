import { findRole } from "../services/userService"

export const getRoleId = async (role: string) => {
  const roleData = await findRole()
  return roleData.find((data) => data.name === role)
}
