import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: {
      name: name,
    },
  })
}

const getCategoryById = async (categoryId: string) => {
  return await prisma.category.findFirst({
    where: {
      id: Number(categoryId),
    },
  })
}

const getAllCategory = async () => {
  return await prisma.category.findMany()
}

const editCategory = async (categoryId: number, name: string) => {
  return await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
    },
  })
}

export { createCategory, getCategoryById, getAllCategory, editCategory }
