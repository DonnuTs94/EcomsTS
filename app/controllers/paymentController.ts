import { Request, Response } from "express"
import { fetchResponse } from "../api/dummyPaymentGateway"
import { findOrderId, updateStatusPayment } from "../services/orderService"

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
      const orderData = await findOrderId(orderId)

      if (orderData?.total !== amount) {
        return res.status(400).json({
          message:
            "Payment failed! The total amount provided does not match the order total.",
        })
      }

      if (orderData?.status !== "waitingForPayment") {
        return res.status(400).json({
          message:
            "You can only make a payment for orders with the status 'waiting for payment'.",
        })
      }

      const responsePayment = await fetchResponse(dataPayment)
      if (responsePayment.message === "Payment failed") {
        return res.status(400).json({
          message: "Payment failed!",
        })
      }

      await updateStatusPayment(orderId, "paid")

      return res.status(200).json({
        message: "Payment Successful",
      })
    } catch (err: any) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default paymentController
