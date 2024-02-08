import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const token = async (email: string, password: string) => {
  const findUser = await prisma.user.findFirst({
    where: {
      email,
    },
  })
}
