import schedule from "node-schedule"
import { PrismaClient } from "@prisma/client"
import { addHours, addSeconds } from "date-fns"
import { findOrderItemFromOrderId } from "../services/orderItemService"

const prisma = new PrismaClient()

const paymentCheck = (date: Date, orderId: number, status: string) => {
  const checkStatus = addSeconds(date, 1)

  schedule.scheduleJob(checkStatus, async () => {
    if (status === "waitingForPayment") {
      console.log("Update status to canceled")

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "canceled",
        },
      })

      const getAllOrderItemInOrderId = await findOrderItemFromOrderId(
        Number(orderId)
      )

      await Promise.all(
        getAllOrderItemInOrderId.map(async (item) => {
          console.log(
            `Updating product: id ${item.productId} and increment the quantity by ${item.quantity}`
          )
          await prisma.product.updateMany({
            where: {
              id: Number(item.productId),
            },
            data: {
              quantity: {
                increment: item.quantity,
              },
            },
          })
        })
      )
    }
  })
}

export { paymentCheck }
