import { Request, Response } from "express"
import { UserRegister } from "../interface/userInterface"
import { createUser, findRole } from "../services/userService"

const adminController = {
  createAdmin: async (req: Request, res: Response) => {
    try {
      const {
        username,
        email,
        password,
        address,
        firstName,
        lastName,
      }: UserRegister = req.body

      const userRole = await findRole()

      const foundRoleUserId = userRole.find(
        (admin) => admin.name === "administrator"
      )

      const RoleId = Number(foundRoleUserId?.id)

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
}

export default adminController
