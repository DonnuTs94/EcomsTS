import { Request, Response } from "express"
import {
  addProductToCart,
  deleteCartUserLogin,
  foundCartById,
  foundCartByProductId,
  getAllCartUserLogin,
  updateCartQuantity,
} from "../services/cartService"
import { getProductId } from "../services/productService"

const cartController = {
  addToCart: async (req: Request, res: Response) => {
    try {
      const { productId, quantity } = req.body
      const productData = await getProductId(Number(productId))
      const userId = Number(req.user?.id)

      if (!productData) {
        return res.status(400).json({
          message: "Product does'nt exist!",
        })
      }

      if (productData.quantity < quantity) {
        return res.status(400).json({
          message:
            "The requested quantity exceeds the available stock for this product",
        })
      }

      const productIsExist = await foundCartByProductId(
        Number(productId),
        userId
      )
      const total = Number(productData.price * quantity)

      if (productIsExist) {
        const newQuantity = productIsExist.quantity + quantity
        const newTotal = productIsExist.total + total
        await updateCartQuantity(productIsExist?.id, newQuantity, newTotal)
        return res.status(200).json({
          message: "Successfully update cart quantity",
        })
      }

      await addProductToCart(userId, productId, quantity, total)

      return res.status(200).json({
        message: "Success add product to cart!",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  updateCartQuantity: async (req: Request, res: Response) => {
    try {
      const { cartId, quantity } = req.body

      if (!cartId || !quantity) {
        return res.status(400).json({
          message: "Input must be filled!",
        })
      }

      const foundCartData = await foundCartById(Number(cartId))

      if (!foundCartData) {
        return res.status(400).json({
          message: "Cart does'nt exist!",
        })
      }

      const foundProductData = await getProductId(
        Number(foundCartData?.productId)
      )

      if (
        !foundCartData ||
        typeof foundCartData.quantity !== "number" ||
        !foundProductData ||
        typeof foundProductData.price !== "number"
      ) {
        return res.status(400).json({
          message: "Invalid cart data or product data",
        })
      }

      if (foundProductData.quantity < quantity) {
        return res.status(400).json({
          message:
            "The requested quantity exceeds the available stock for this product",
        })
      }

      const total = quantity * foundProductData.price

      await updateCartQuantity(foundCartData.id, quantity, total)

      return res.status(200).json({
        message: "Successfully update cart quantity",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getAllCart: async (req: Request, res: Response) => {
    try {
      const getUserLogin = Number(req.user?.id)
      const getCartData = await getAllCartUserLogin(getUserLogin)

      if (getCartData.length === 0) {
        return res.status(200).json({
          message: "Cart  is empty!",
        })
      }

      return res.status(200).json({
        message: "Successfully get current user cart!",
        data: getCartData,
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
  deleteCart: async (req: Request, res: Response) => {
    try {
      const { cartId } = req.body

      const foundCartData = await foundCartById(Number(cartId))

      if (!foundCartData) {
        return res.status(400).json({
          message: "Cart does'nt exist!",
        })
      }
      await deleteCartUserLogin(cartId)

      return res.status(200).json({
        message: "Successfully delete cart",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default cartController
