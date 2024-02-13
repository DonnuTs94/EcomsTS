import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const findOrderOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentUser = Number(req.user?.id)

  const orderOwner = await prisma.order.findFirst({
    where: {
      id: Number(req.params.id),
    },
  })

  if (orderOwner?.userId !== currentUser) {
    return res.status(400).json({
      message: "Restricted!",
    })
  }
  next()
}

export { findOrderOwner }
