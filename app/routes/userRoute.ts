import { Router } from "express"
import userController from "../controllers/userController"
import { validateRegister } from "../middlewares/authMiddleware"

const router = Router()

router.post("/register", validateRegister, userController.register)

export default router
