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

const foundProductIdInCart = async (productId: number) => {
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
  })
}

const deleteCartUserLogin = async (cartId: number) => {
  return await prisma.cart.delete({
    where: {
      id: cartId,
    },
  })
}

export {
  addProductToCart,
  foundProductIdInCart,
  updateCartQuantity,
  getAllCartUserLogin,
  foundCartById,
  deleteCartUserLogin,
}
