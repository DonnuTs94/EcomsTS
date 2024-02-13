import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const verifyCartOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const findCartOwner = await prisma.cart.findFirst({
    where: {
      userId: req.user?.id,
    },
  })

  if (!findCartOwner) {
    return res.status(400).json({
      message: "Restricted!",
    })
  }
  next()
}

export { verifyCartOwner }
