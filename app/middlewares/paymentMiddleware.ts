import { findOrderId } from "../services/orderService"
import { Request, Response, NextFunction } from "express"

const paymentCondition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount, cardNumber, cvv, expiryMonth, expiryYear } = req.body
  const orderId = Number(req.params.id)

  if (!amount || !cardNumber || !cvv || !expiryMonth || !expiryYear) {
    return res.status(400).json({
      message: "Input must be filled!",
    })
  }

  const orderData = await findOrderId(orderId)

  if (orderData?.status !== "waitingForPayment") {
    return res.status(400).json({
      message:
        "You can only make a payment for orders with the status 'waiting for payment'.",
    })
  }

  if (orderData?.total !== amount) {
    return res.status(400).json({
      message:
        "Payment failed! The total amount provided does not match the order total.",
    })
  }

  next()
}

export { paymentCondition }
