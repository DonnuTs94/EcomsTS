import { PrismaClient, StatusOrder } from "@prisma/client"

const prisma = new PrismaClient()

const createOrder = async (
  total: number,
  date: Date,
  orderId: number,
  status: StatusOrder,
  userId: number
) => {
  const paddedOrderId = orderId.toString().padStart(5, "0")
  const invoice = `invoice-${paddedOrderId}`

  return await prisma.order.create({
    data: {
      total,
      date,
      invoice,
      status,
      userId,
    },
  })
}

const findAllOrder = async () => {
  return await prisma.order.findMany()
}

const findAllOrdersUser = async (userId: number) => {
  return await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      OrderItem: {
        select: {
          quantity: true,
          total: true,
          Product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
  })
}

const findOrderUserById = async (oderId: number) => {
  return await prisma.order.findFirst({
    where: {
      id: oderId,
    },
    include: {
      OrderItem: {
        select: {
          quantity: true,
          total: true,
          Product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
  })
}

export { createOrder, findAllOrder, findAllOrdersUser, findOrderUserById }
