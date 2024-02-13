import { Router } from "express"
import {
  authorizePermission,
  validateRegister,
  verifyToken,
} from "../middlewares/authMiddleware"
import { Permission } from "../enum/authorization"
import sellerController from "../controllers/sellerController"

const router = Router()

router.post("/register", validateRegister, sellerController.createSeller)

router.get(
  "/orders",
  verifyToken,
  authorizePermission(Permission.BROWSE_ORDERS),
  sellerController.getAllOrder
)

export default router
