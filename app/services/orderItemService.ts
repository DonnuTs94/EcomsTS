import { PrismaClient } from "@prisma/client"
import { OrderItem } from "../interface/orderItemsInterface"

const prisma = new PrismaClient()

const createOrderItem = async (orderItemData: OrderItem[]) => {
  return await prisma.orderItem.createMany({
    data: orderItemData,
  })
}

export { createOrderItem }
