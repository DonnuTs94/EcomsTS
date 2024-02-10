import { Router } from "express"
import { authorizePermission, verifyToken } from "../middlewares/authMiddleware"
import { Permission } from "../enum/authorization"
import { upload } from "../lib/uploader"
import productController from "../controllers/productController"
import { verifyAdminOwnership } from "../middlewares/propertyMiddleware"

const router = Router()

router.post(
  "/",
  verifyToken,
  authorizePermission(Permission.ADD_PRODUCT),
  upload({
    dynamicDestination: "public",
    acceptedFileTypes: ["jpg", "png", "jpeg"],
    fileName: "product_url",
    filePrefix: "product_pict_url",
    maxSize: 6 * 1024 * 1024,
  }),
  productController.createProduct
)

router.get("/", productController.getAllProduct)
router.get("/:id", productController.getProductById)

router.delete(
  "/hard-delete/:id",
  verifyToken,
  authorizePermission(Permission.DELETE_PRODUCT),
  verifyAdminOwnership,
  productController.hardDelete
)

router.delete(
  "/:id",
  verifyToken,
  authorizePermission(Permission.DELETE_PRODUCT),
  verifyAdminOwnership,
  productController.softDelete
)

export default router
