import { Request, Response } from "express"
import {
  addProductToCart,
  foundProductIdInCart,
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

      const productIsExist = await foundProductIdInCart(Number(productId))
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
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default cartController
