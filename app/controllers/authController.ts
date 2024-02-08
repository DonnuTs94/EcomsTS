import { Request, Response } from "express"
import { findEmail } from "../services/userService"
import bcrypt from "bcrypt"
import { generateToken } from "../lib/jwt"

const authController = {
  token: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const userData = await findEmail(email)

      if (!userData) {
        return res.status(400).json({
          message: "Invalid credentials",
        })
      }

      const passwordIsValid = bcrypt.compareSync(password, userData.password)

      if (!passwordIsValid) {
        return res.status(400).json({
          message: "Invalid credentials",
        })
      }

      const token = generateToken({
        id: userData.id,
        roleId: userData.roleId,
      })

      return res.status(200).json({
        message: "Access granted, welcome!",
        token: token,
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default authController
