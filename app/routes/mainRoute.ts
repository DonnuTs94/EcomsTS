import { Router } from "express"
import userRoute from "./userRoute"
import adminRouter from "./adminRoute"
import authRoute from "./authRoute"
import categoryRoute from "./categoryRoute"
import productRoute from "./productRoute"

const router = Router()

router.use("/user", userRoute)
router.use("/admin", adminRouter)
router.use("/auth", authRoute)
router.use("/category", categoryRoute)
router.use("/product", productRoute)

export default router
