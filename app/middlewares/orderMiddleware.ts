import { Request, Response, NextFunction } from "express"
import { findOrderId } from "../services/orderService"

const findOrderOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentUser = Number(req.user?.id)

  const orderOwner = await findOrderId(Number(req.params.id))

  if (orderOwner?.userId !== currentUser) {
    return res.status(400).json({
      message: "Restricted!",
    })
  }
  next()
}

export { findOrderOwner }
