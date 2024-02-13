import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { deleteManyCart, findCartIds } from "../services/cartService"
import {
  createOrder,
  findAllOrder,
  findAllOrdersUser,
  findOrderUserById,
} from "../services/orderService"
import { createOrderItem } from "../services/orderItemService"
import { getProductIds, updateManyQuantity } from "../services/productService"
import { fetchResponse } from "../api/dummyPaymentGateway"

const prisma = new PrismaClient()

const orderController = {
  createOder: async (req: Request, res: Response) => {
    try {
      await prisma.$transaction(async () => {
        const { cartIds, amount, cardNumber, cvv, expiryMonth, expiryYear } =
          req.body

        const cartData = await findCartIds(cartIds)

        if (cartIds.length === 0) {
          return res.status(400).json({
            message: "Input must be filled!",
          })
        }

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

        let sum = 0

        cartData.forEach((item) => {
          sum += item.total
        })

        const orderData = await findAllOrder()

        let createInvoiceNumber = Number(0)

        if (orderData.length === 0) {
          createInvoiceNumber = 1
        } else {
          orderData.sort((a, b) => b.id - a.id)

          const lastOrderId = orderData[0].id

          createInvoiceNumber = lastOrderId + 1
        }

        const currentDate = new Date()

        const findProductIdInCart = cartData.map((item) => {
          return item.productId
        })

        const findQtyProductInCart = cartData.map((item) => {
          return item.quantity
        })

        const productIds = await getProductIds(findProductIdInCart as number[])

        productIds.map((data) => {
          if (!data) {
            return res.status(400).json({
              message: "Product does'nt exist",
            })
          }
        })

        const findQtyProduct = productIds.map((item) => {
          return item.quantity
        })

        const isQuantityExceeded = findQtyProductInCart.some((qty, index) => {
          return qty > findQtyProduct[index]
        })

        if (isQuantityExceeded) {
          return res.status(400).json({
            message:
              "The requested quantity exceeds the available stock for one or more products",
          })
        }

        const responsePayment = await fetchResponse(dataPayment)
        if (responsePayment.message === "Payment failed") {
          return res.status(400).json({
            message: "Payment failed!",
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

        const newProductQty = findQtyProduct.map((item, i) => {
          return item - findQtyProductInCart[i]
        })

        await createOrderItem(orderItemData)

        await updateManyQuantity(findProductIdInCart as [], newProductQty)

        await deleteManyCart(cartIds)

        return res.status(200).json({
          message: "Success add new order",
          data: createOrderData,
        })
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getAllOrdersUser: async (req: Request, res: Response) => {
    try {
      const currentUser = Number(req.user?.id)

      const getAllUserOrders = await findAllOrdersUser(currentUser)

      return res.status(200).json({
        message: "Success get all orders user!",
        data: getAllUserOrders,
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getOrderUserById: async (req: Request, res: Response) => {
    try {
      const getOrderDetail = await findOrderUserById(Number(req.params.id))

      if (!getOrderDetail) {
        return res.status(400).json({
          message: "Order does'nt exist!",
        })
      }

      return res.status(200).json({
        message: "Success get order detail",
        data: getOrderDetail,
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default orderController
