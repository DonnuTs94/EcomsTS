import { PrismaClient } from "@prisma/client"
import { ProductPagination } from "../interface/productInterface"

const prisma = new PrismaClient()

const getProductById = async (productId: number) => {
  return await prisma.product.findFirst({
    where: {
      id: productId,
      deleted: false,
    },
    include: {
      Category: true,
      productImage: true,
    },
  })
}

const getAllProduct = async (pagesize: number, offset: number) => {
  return await prisma.product.findMany({
    take: pagesize,
    skip: offset,
    where: {
      deleted: false,
    },
  })
}

const getTotalProduct = async () => {
  return prisma.product.findMany()
}

export { getProductById, getAllProduct, getTotalProduct }
