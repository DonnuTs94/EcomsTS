import { Request, Response } from "express"

const cartController = {
  addToCart: async (req: Request, res: Response) => {
    try {
      const { productId, quantity } = req.body
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default cartController
