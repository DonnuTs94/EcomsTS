import { PrismaClient, StatusOrder } from "@prisma/client"

const prisma = new PrismaClient()

const createOrder = async (
  total: number,
  date: Date,
  orderId: number,
  status: StatusOrder
) => {
  const paddedOrderId = orderId.toString().padStart(5, "0")
  const invoice = `invoice-${paddedOrderId}`

  return await prisma.order.create({
    data: {
      total,
      date,
      invoice,
      status,
    },
  })
}

const foundAllOrder = async () => {
  return await prisma.order.findMany()
}

export { createOrder, foundAllOrder }
