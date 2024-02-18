import schedule from "node-schedule"
import { PrismaClient } from "@prisma/client"
import { addSeconds, addMinutes } from "date-fns"
import { findOrderItemFromOrderId } from "../services/orderItemService"
import { findOrderId, updateStatusPayment } from "../services/orderService"

const prisma = new PrismaClient()

const paymentCheck = (date: Date, orderId: number) => {
  const checkStatus = addMinutes(date, 1)

  schedule.scheduleJob(checkStatus, async () => {
    const order = await findOrderId(orderId)

    if (order?.status === "waitingForPayment") {
      console.log("Updating status to canceled for order:", orderId)

      await updateStatusPayment(orderId, "canceled")

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

const updatePaymentToSuccess = (date: Date, orderId: number) => {
  const job = addSeconds(date, 20)

  schedule.scheduleJob(job, async () => {
    console.log("Order status is success")
    await updateStatusPayment(orderId, "Success")
  })
}

export { paymentCheck, updatePaymentToSuccess }
