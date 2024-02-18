import { Request, Response } from "express"
import { fetchResponse } from "../api/dummyPaymentGateway"
import { updateStatusPayment } from "../services/orderService"
import { updatePaymentToSuccess } from "../schedule/paymentCheck"

const paymentController = {
  createPayment: async (req: Request, res: Response) => {
    try {
      const { amount, cardNumber, cvv, expiryMonth, expiryYear } = req.body
      const orderId = Number(req.params.id)

      const dataPayment = {
        amount,
        cardNumber,
        cvv,
        expiryMonth,
        expiryYear,
      }

      const responsePayment = await fetchResponse(dataPayment)
      if (responsePayment.message === "Payment failed") {
        return res.status(400).json({
          message: "Payment failed!",
        })
      }

      const orderData = await updateStatusPayment(orderId, "paid")

      updatePaymentToSuccess(orderData.updatedAt, orderData.id)

      return res.status(200).json({
        message: "Payment Successful",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default paymentController
