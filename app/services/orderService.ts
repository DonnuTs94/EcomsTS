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

const sellerAllOrders = async (adminId: number) => {
  const adminOrders = await prisma.product.findMany({
    where: {
      userId: adminId,
    },

    select: {
      name: true,
      Category: {
        select: {
          name: true,
        },
      },
      price: true,
      OrderItem: {
        select: {
          quantity: true,
          total: true,
          Order: {
            select: {
              invoice: true,
              date: true,
              status: true,
            },
          },
        },
      },
    },
  })

  const filterAdminOrders = adminOrders.filter((orderItem) => {
    orderItem.OrderItem.filter((order) => {
      if (order.Order === null) {
        return false
      }
      return true
    })
    if (orderItem.OrderItem.length === 0) {
      return false
    }

    return true
  })

  return filterAdminOrders
}

export {
  createOrder,
  findAllOrder,
  findAllOrdersUser,
  findOrderUserById,
  sellerAllOrders,
}
