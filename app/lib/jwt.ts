import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const SECRET_KEY: string = process.env.JWT_KEY || ""

const generateToken = (payload: any) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" })
}

const validToken = (token: any) => {
  return jwt.verify(token, SECRET_KEY)
}

export { generateToken, validToken }
