import { Router } from "express"
import { authorizePermission, verifyToken } from "../middlewares/authMiddleware"
import { Permission } from "../enum/authorization"
import cartController from "../controllers/cartController"

const router = Router()

router.post(
  "/",
  verifyToken,
  authorizePermission(Permission.ADD_CART),
  cartController.addToCart
)

export default router
