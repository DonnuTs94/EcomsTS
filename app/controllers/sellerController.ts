import { Request, Response } from "express"
import { sellerAllOrders } from "../services/orderService"
import { UserRegister } from "../interface/userInterface"
import { getRoleId } from "../helper/role"
import { Role } from "../enum/authorization"
import { createUser, findEmail } from "../services/userService"

const sellerController = {
  createSeller: async (req: Request, res: Response) => {
    try {
      const {
        username,
        email,
        password,
        address,
        firstName,
        lastName,
      }: UserRegister = req.body

      const findRoleSeller = await getRoleId(Role.SELLER)

      const RoleId = Number(findRoleSeller?.id)

      const emailExist = await findEmail(email)

      if (emailExist) {
        return res.status(401).json({
          message: "Email has already exist!",
        })
      }

      await createUser(
        username,
        email,
        password,
        firstName,
        lastName,
        address,
        RoleId
      )

      return res.status(200).json({
        message: "Successfully create new admin!",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error!",
      })
    }
  },
  getAllOrder: async (req: Request, res: Response) => {
    try {
      const currentUser = Number(req.user?.id)

      const allAdminOrderData = await sellerAllOrders(currentUser)

      return res.status(200).json({
        message: "Success get all admin orders",
        data: allAdminOrderData,
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default sellerController
