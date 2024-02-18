import schedule from "node-schedule"
import { PrismaClient } from "@prisma/client"
import { addHours, addSeconds } from "date-fns"

const prisma = new PrismaClient()

const paymentCheck = (date: Date, orderId: number, status: string) => {
  const checkStatus = addSeconds(date, 5)

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
    }
  })
}

export { paymentCheck }
