import { Request, Response } from "express"
import { UserRegister } from "../interface/userInterface"
import { createUser, findEmail } from "../services/userService"
import { getRoleId } from "../helper/role"

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

      const findRoleAdmin = await getRoleId("administrator")

      const RoleId = Number(findRoleAdmin?.id)

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
}

export default adminController
