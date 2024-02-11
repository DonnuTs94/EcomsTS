import { Router } from "express"
import { authorizePermission, verifyToken } from "../middlewares/authMiddleware"
import { Permission } from "../enum/authorization"
import cartController from "../controllers/cartController"
import { verifyCartOwner } from "../middlewares/cartMiddleware"

const router = Router()

router.post(
  "/",
  verifyToken,
  authorizePermission(Permission.ADD_CART),
  cartController.addToCart
)

router.get(
  "/",
  verifyToken,
  authorizePermission(Permission.BROWSE_CARTS),
  cartController.getAllCart
)

router.put(
  "/",
  verifyToken,
  verifyCartOwner,
  authorizePermission(Permission.EDIT_CART),
  cartController.updateCartQuantity
)

router.delete(
  "/",
  verifyToken,
  verifyCartOwner,
  authorizePermission(Permission.DELETE_CART),
  cartController.deleteCart
)

export default router
