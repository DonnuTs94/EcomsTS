import { Router } from "express"
import adminController from "../controllers/adminController"

const router = Router()

router.post("/register", adminController.createAdmin)

export default router
