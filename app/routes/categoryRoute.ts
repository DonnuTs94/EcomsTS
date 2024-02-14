import { Router } from "express"
import categoryController from "../controllers/categoryController"
import { verifyToken, authorizePermission } from "../middlewares/authMiddleware"
import { Permission } from "../enum/authorization"

const router = Router()

router.get("/", categoryController.getAllCategory)

router.post(
  "/",
  verifyToken,
  authorizePermission(Permission.ADD_CATEGORY),
  categoryController.create
)

router.put(
  "/",
  verifyToken,
  authorizePermission(Permission.EDIT_CATEGORY),
  categoryController.edit
)

export default router
