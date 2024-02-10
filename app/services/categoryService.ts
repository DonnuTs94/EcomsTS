import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const createCategory = async (name: string) => {
  try {
    await prisma.category.create({
      data: {
        name: name,
      },
    })
  } catch (err: any) {
    throw err
  }
}

const getCategoryById = async (categoryId: string) => {
  return await prisma.category.findFirst({
    where: {
      id: Number(categoryId),
    },
  })
}

export { createCategory, getCategoryById }
