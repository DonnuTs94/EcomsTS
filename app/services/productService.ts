import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getDataProductById = async (productId: number) => {
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

const getProductId = async (productId: number) => {
  return await prisma.product.findFirst({
    where: {
      id: productId,
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
    include: {
      Category: {
        select: {
          id: true,
          name: true,
        },
      },
      productImage: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  })
}

const getTotalProduct = async () => {
  return prisma.product.findMany()
}

const hardDelete = async (productId: number) => {
  return await prisma.product.delete({
    where: {
      id: productId,
    },
  })
}

const softDelete = async (productId: number) => {
  return await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      deleted: true,
    },
  })
}

const updatePrice = async (productId: number, price: number) => {
  return await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      price: price,
    },
  })
}
export {
  getDataProductById,
  getAllProduct,
  getTotalProduct,
  hardDelete,
  softDelete,
  getProductId,
  updatePrice,
}
