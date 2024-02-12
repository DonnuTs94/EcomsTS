import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const addProductToCart = async (
  userId: number,
  productId: number,
  quantity: number,
  total: number
) => {
  return await prisma.cart.create({
    data: {
      userId: userId,
      productId,
      quantity,
      total,
    },
  })
}

const foundCartByProductId = async (productId: number) => {
  return await prisma.cart.findFirst({
    where: {
      productId: productId,
    },
  })
}

const foundCartById = async (cartId: number) => {
  return await prisma.cart.findFirst({
    where: {
      id: cartId,
    },
  })
}

const updateCartQuantity = async (
  cartId: number,
  newQuantity: number,
  newTotal: number
) => {
  return await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      quantity: newQuantity,
      total: newTotal,
    },
  })
}

const getAllCartUserLogin = async (userId: number) => {
  return await prisma.cart.findMany({
    where: {
      userId: userId,
    },
    include: {
      Product: {
        select: {
          name: true,
          price: true,
          description: true,
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
      },
    },
  })
}

const deleteCartUserLogin = async (cartId: number) => {
  return await prisma.cart.delete({
    where: {
      id: cartId,
    },
  })
}

const foundCartIds = async (cartId: number[]) => {
  return await prisma.cart.findMany({
    where: {
      id: {
        in: cartId,
      },
    },
    include: {
      Product: true,
    },
  })
}

const deleteManyCart = async (cartId: number[]) => {
  return await prisma.cart.deleteMany({
    where: {
      id: {
        in: cartId,
      },
    },
  })
}

export {
  addProductToCart,
  foundCartByProductId,
  updateCartQuantity,
  getAllCartUserLogin,
  foundCartById,
  deleteCartUserLogin,
  foundCartIds,
  deleteManyCart,
}
