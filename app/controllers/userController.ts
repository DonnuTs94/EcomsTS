import { Request, Response } from "express"
import { UserRegister } from "../interface/userInterface"
import { createUser, findEmail, findRole } from "../services/userService"
import { getRoleId } from "../helper/role"

const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const {
        username,
        email,
        password,
        address,
        firstName,
        lastName,
      }: UserRegister = req.body

      const findRoleUser = await getRoleId("user")

      const emailExist = await findEmail(email)

      if (emailExist) {
        return res.status(401).json({
          message: "Email has already exist!",
        })
      }

      const RoleId = Number(findRoleUser?.id)

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
        message: "Successfully create new user!",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
}

export default userController
