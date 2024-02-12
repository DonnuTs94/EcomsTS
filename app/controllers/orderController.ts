import { Request, Response, response } from "express"
import { deleteManyCart, foundCartIds } from "../services/cartService"
import { createOrder, foundAllOrder } from "../services/orderService"
import { createOrderItem } from "../services/orderItemService"
import { getProductIds, updateManyQuantity } from "../services/productService"

const orderController = {
  createOder: async (req: Request, res: Response) => {
    try {
      const { cartIds, amount, cardNumber, cvv, expiryMonth, expiryYear } =
        req.body

      const cartData = await foundCartIds(cartIds)

      if (cartIds.length !== cartData.length) {
        return res.status(400).json({
          message: "Cart does'nt exist!",
        })
      }

      const dataPayment = {
        amount,
        cardNumber,
        cvv,
        expiryMonth,
        expiryYear,
      }

      const fetchResponse = await fetch("http://localhost:3000/pay", {
        method: "POST",
        body: JSON.stringify(dataPayment),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())

      if (fetchResponse.message === "Payment failed") {
        return res.status(400).json({
          message: "Payment failed!",
        })
      }

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

      const foundProductIdInCart = cartData.map((item) => {
        return item.productId
      })

      const foundQtyProductInCart = cartData.map((item) => {
        return item.quantity
      })

      const productIds = await getProductIds(foundProductIdInCart as number[])

      productIds.map((data) => {
        if (!data) {
          return res.status(400).json({
            message: "Product does'nt exist",
          })
        }
      })

      const foundQtyProduct = productIds.map((item) => {
        return item.quantity
      })

      const isQuantityExceeded = foundQtyProductInCart.some((qty, index) => {
        return qty > foundQtyProduct[index]
      })

      if (isQuantityExceeded) {
        return res.status(400).json({
          message:
            "The requested quantity exceeds the available stock for one or more products",
        })
      }

      const createOrderData = await createOrder(
        sum,
        currentDate,
        createInvoiceNumber,
        "paid",
        Number(req.user?.id)
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

      const newProductQty = foundQtyProduct.map((item, i) => {
        return item - foundQtyProductInCart[i]
      })

      await createOrderItem(orderItemData)

      await updateManyQuantity(foundProductIdInCart as [], newProductQty)

      await deleteManyCart(cartIds)

      return res.status(200).json({
        message: "Success add new order",
        data: createOrderData,
      })
    } catch (err: any) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default orderController
