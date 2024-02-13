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
  return await prisma.role.findMany()
}

const findEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  })
}

export { createUser, findRole, findEmail }
