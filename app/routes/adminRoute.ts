import { Router } from "express"
import adminController from "../controllers/adminController"
import { validateRegister } from "../middlewares/authMiddleware"

const router = Router()

router.post("/register", validateRegister, adminController.createAdmin)

export default router
