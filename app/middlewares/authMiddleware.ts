import { Request, Response, NextFunction } from "express"
import { User, UserRegister } from "../interface/userInterface"
import { EMAIL_VALIDATOR, PASSWORD_VALIDATOR } from "../constant/regexValidator"
import { validToken } from "../lib/jwt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const error: Partial<UserRegister> = {}

  const { username, email, password, address, firstName, lastName } = req.body

  if (!username) {
    error.username = "Username is required"
  }

  if (!address) {
    error.address = "Address is required"
  }

  if (!firstName) {
    error.firstName = "First name is required"
  }

  if (!lastName) {
    error.lastName = "Last name is required"
  }

  if (typeof email !== "string" || !email.match(EMAIL_VALIDATOR)) {
    error.email = "Incorrect e-mail format"
  }

  if (typeof password !== "string" || !password.match(PASSWORD_VALIDATOR)) {
    error.password =
      "Password length minimum 8 ,must have 1 number, 1 capital and 1 symbol"
  }

  if (Object.keys(error).length > 0) {
    return res.status(422).json(error)
  }

  next()
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      message: "User Unauthorized",
    })
  }

  try {
    token = token.split(" ")[1]

    const verifiedUser = validToken(token)

    if (!verifiedUser) {
      return res.status(401).json({
        message: "Unauthorized request",
      })
    }

    req.user = verifiedUser as User

    next()
  } catch (err: any) {
    return res.status(401).json({
      message: "Invalid Token",
    })
  }
}

const authorizePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(400).json({
        message: "Unauthorized",
      })
    }

    const permissionRecord = await prisma.permissionRole.findMany({
      where: {
        roleId: Number(req.user.roleId),
      },
      include: {
        Permission: true,
      },
    })

    const permissions = permissionRecord.map(
      (record) => record.Permission?.name
    )

    if (!permissions.includes(permission)) {
      return res.status(403).json({
        message: "Forbidden",
      })
    }

    next()
  }
}

export { validateRegister, verifyToken, authorizePermission }
