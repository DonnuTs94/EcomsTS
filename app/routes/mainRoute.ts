import { Router } from "express"
import userRoute from "./userRoute"
import adminRouter from "./adminRoute"
import authRoute from "./authRoute"
import categoryRoute from "./categoryRoute"
import productRoute from "./productRoute"
import cartRoute from "./cartRoute"

const router = Router()

router.use("/user", userRoute)
router.use("/admin", adminRouter)
router.use("/auth", authRoute)
router.use("/category", categoryRoute)
router.use("/product", productRoute)
router.use("/cart", cartRoute)

export default router
