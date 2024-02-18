import { Router } from "express"
import userRoute from "./userRoute"
import adminRouter from "./adminRoute"
import authRoute from "./authRoute"
import categoryRoute from "./categoryRoute"
import productRoute from "./productRoute"
import cartRoute from "./cartRoute"
import orderRoute from "./orderRoute"
import sellerRoute from "./sellerOrderRoute"

const router = Router()

router.use("/user", userRoute)
router.use("/admin", adminRouter)
router.use("/seller", sellerRoute)
router.use("/auth", authRoute)
router.use("/category", categoryRoute)
router.use("/product", productRoute)
router.use("/cart", cartRoute)
router.use("/order", orderRoute)

// Uncomment the following code to enable listing of all routes in the application.

// import expressListRoutes from "express-list-routes"
// expressListRoutes(router)

export default router
