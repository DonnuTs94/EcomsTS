import { PrismaClient } from "@prisma/client"
import { Request, Response, NextFunction } from "express"

const prisma = new PrismaClient()

const verifyAdminOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const findAdminProduct = await prisma.product.findFirst({
    where: {
      userId: req.user?.id,
    },
  })

  if (findAdminProduct?.userId !== req.user?.id) {
    return res.status(400).json({
      message: "Restricted!",
    })
  }
  next()
}

export { verifyAdminOwnership }
