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
      ProductImage: true,
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

const getAllProduct = async (
  product: string,
  category: number,
  pagesize: number,
  offset: number
) => {
  return await prisma.product.findMany({
    take: pagesize,
    skip: offset,
    where: {
      name: {
        contains: product,
      },
      ...(category ? { categoryId: category } : {}),
      deleted: false,
    },
    include: {
      Category: {
        select: {
          name: true,
        },
      },
      ProductImage: {
        select: {
          imageUrl: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })
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

const getProductIds = async (productIds: number[]) => {
  return await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  })
}

const updateManyQuantity = async (productIds: number[], newQty: number[]) => {
  if (productIds.length !== newQty.length) {
    throw new Error("ProductIds and newQty arrays must have the same length.")
  }

  const updates = productIds.map((productId, index) => {
    return prisma.product.updateMany({
      where: { id: productId },
      data: { quantity: newQty[index] },
    })
  })

  return await Promise.all(updates)
}

const countProductData = async (product: string, categoryId: number) => {
  return await prisma.product.count({
    where: {
      name: {
        contains: product,
      },
      ...(categoryId ? { categoryId: categoryId } : {}),
    },
  })
}

export {
  getDataProductById,
  getAllProduct,
  hardDelete,
  softDelete,
  getProductId,
  getProductIds,
  updatePrice,
  updateManyQuantity,
  countProductData,
}
