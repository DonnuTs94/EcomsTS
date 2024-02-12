import { Router } from "express"
import orderController from "../controllers/orderController"
import { verifyToken, authorizePermission } from "../middlewares/authMiddleware"
import { Permission } from "../enum/authorization"

const router = Router()

router.post(
  "/",
  verifyToken,
  authorizePermission(Permission.ADD_ORDER),
  orderController.createOder
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
  authorizePermission(Permission.READ_ORDER),
  orderController.getOrderUserById
)

export default router
