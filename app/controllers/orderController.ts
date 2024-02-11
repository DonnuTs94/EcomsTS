import { Request, Response } from "express"
import { foundCartIds } from "../services/cartService"
import { createOrder, foundAllOrder } from "../services/orderService"
import { createOrderItem } from "../services/orderItemService"

const orderController = {
  createOder: async (req: Request, res: Response) => {
    try {
      const { cartIds } = req.body
      const getCartData = cartIds.map((id: number) => {
        return id
      })
      const cartData = await foundCartIds(getCartData.id)

      let sum = 0

      cartData.forEach((item) => {
        sum += item.total
      })

      const orderData = await foundAllOrder()

      let createInvoiceNumber = Number(0)

      if (orderData.length === 0) {
        createInvoiceNumber = 1
      } else {
        orderData.sort((a, b) => b.id - a.id)

        const lastOrderId = orderData[0].id

        createInvoiceNumber = lastOrderId + 1
      }

      const currentDate = new Date()

      //   lakukan compare quantity yang ada di cart
      // dengan quantity yang ada saat ini
      //  ketika tidak ada maka return quantity product A tidak mencukupi

      const createOrderData = await createOrder(
        sum,
        currentDate,
        createInvoiceNumber,
        "waitingForPayment"
      )

      const orderItemData = cartData.map((item) => {
        return {
          quantity: item.quantity,
          price: item.Product?.price || 0,
          total: item.total,
          orderId: Number(createOrderData.id),
          productId: Number(item.productId),
        }
      })

      await createOrderItem(orderItemData)

      return res.status(200).json({
        message: "Success add new order",
        // data: cartData,
        sum,
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default orderController
