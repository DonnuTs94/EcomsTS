import { Router } from "express"
import orderController from "../controllers/orderController"
import { verifyToken, authorizePermission } from "../middlewares/authMiddleware"
import { Permission } from "../enum/authorization"
import { findOrderOwner } from "../middlewares/orderMiddleware"
import paymentController from "../controllers/paymentController"
import { paymentCondition } from "../middlewares/paymentMiddleware"

const router = Router()

router.post(
  "/",
  verifyToken,
  authorizePermission(Permission.ADD_ORDER),
  orderController.createOder
)

router.post(
  "/:id/payment",
  verifyToken,
  findOrderOwner,
  authorizePermission(Permission.ADD_PAYMENT),
  paymentCondition,
  paymentController.createPayment
)

router.get(
  "/",
  verifyToken,
  authorizePermission(Permission.READ_ORDER),
  orderController.getAllOrdersUser
)

router.get(
  "/:id",
  verifyToken,
  findOrderOwner,
  authorizePermission(Permission.READ_ORDER),
  orderController.getOrderUserById
)

export default router
