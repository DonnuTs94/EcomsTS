import { Request, Response } from "express"
import { UserRegister } from "../interface/userInterface"
import { createUser, findEmail, updateUserData } from "../services/userService"
import { getRoleId } from "../helper/role"
import { Role } from "../enum/authorization"

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

      const findRoleUser = await getRoleId(Role.REGULAR_USER)

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
  updateUser: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, address } = req.body

      if (!firstName || !lastName || !address) {
        return res.status(400).json({
          message: "input must be filled!",
        })
      }

      const currentUser = Number(req.user?.id)

      await updateUserData(currentUser, firstName, lastName, address)

      return res.status(200).json({
        message: "Success update user data",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default userController
