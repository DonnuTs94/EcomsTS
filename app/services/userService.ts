import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const createUser = async (
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  address: string,
  RoleId: number
) => {
  const hashPassword = bcrypt.hashSync(password, 5)

  await prisma.user.create({
    data: {
      username,
      email,
      password: hashPassword,
      firstName,
      lastName,
      address,
      RoleId: { connect: { id: RoleId } },
    },
  })
}

const findRole = async () => {
  const findRole = await prisma.role.findMany()

  return findRole
}

export { createUser, findRole }
