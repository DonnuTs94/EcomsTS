import { Router } from "express"
import userRoute from "./userRoute"
import adminRouter from "./adminRoute"

const router = Router()

router.use("/user", userRoute)
router.use("/admin", adminRouter)

export default router
