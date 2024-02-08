import { Router } from "express"
import categoryController from "../controllers/categoryController"
import { verifyToken, authorizePermission } from "../middlewares/authMiddleware"
import { Permission } from "../enum/authorization"

const router = Router()

router.post(
  "/",
  verifyToken,
  authorizePermission(Permission.ADD_CATEGORY),
  categoryController.create
)

export default router
