import { PrismaClient, StatusOrder } from "@prisma/client"
import { OrderItem } from "../interface/orderItemsInterface"

const prisma = new PrismaClient()

const createOrderItem = async (orderItemData: OrderItem[]) => {
  return await prisma.orderItem.createMany({
    data: orderItemData,
  })
}

const findOrderId = async (orderId: number) => {
  return await prisma.order.findFirst({
    where: {
      id: orderId,
    },
  })
}

const updateStatusPayment = async (orderId: number, status: StatusOrder) => {
  return await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status,
    },
  })
}

export { createOrderItem, findOrderId, updateStatusPayment }
