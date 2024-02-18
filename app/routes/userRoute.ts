import { Router } from "express"
import userController from "../controllers/userController"
import { validateRegister, verifyToken } from "../middlewares/authMiddleware"

const router = Router()

router.post("/register", validateRegister, userController.register)
router.put("/update", verifyToken, userController.updateUser)

export default router
