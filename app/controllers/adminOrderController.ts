import { Request, Response } from "express"
import { adminAllOrders } from "../services/orderService"

const adminOrderController = {
  getAllOrder: async (req: Request, res: Response) => {
    try {
      const currentUser = Number(req.user?.id)

      const allAdminOrderData = await adminAllOrders(currentUser)

      return res.status(200).json({
        message: "Success get all admin orders",
        data: allAdminOrderData,
      })
    } catch (err: any) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default adminOrderController
