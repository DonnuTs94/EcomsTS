import { Request, Response, NextFunction } from "express"
import { UserRegister } from "../interface/userInterface"
import { EMAIL_VALIDATOR, PASSWORD_VALIDATOR } from "../constant/regexValidator"

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

export { validateRegister }
