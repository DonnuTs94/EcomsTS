import { Router } from "express"
import adminController from "../controllers/adminController"
import {
  authorizePermission,
  validateRegister,
  verifyToken,
} from "../middlewares/authMiddleware"
import adminOrderController from "../controllers/adminOrderController"
import { Permission } from "../enum/authorization"

const router = Router()

router.post("/register", validateRegister, adminController.createAdmin)

router.get(
  "/orders",
  verifyToken,
  authorizePermission(Permission.BROWSE_ORDERS),
  adminOrderController.getAllOrder
)

export default router
