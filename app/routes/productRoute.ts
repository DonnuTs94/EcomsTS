import { Router } from "express"
import { authorizePermission, verifyToken } from "../middlewares/authMiddleware"
import { Permission } from "../enum/authorization"
import { upload } from "../lib/uploader"
import productController from "../controllers/productController"
import { verifyAdminOwnership } from "../middlewares/productMiddleware"
import productImageController from "../controllers/productImageController"
import {
  validateFilesUpload,
  validateMaxLengthImage,
} from "../middlewares/imageValidator"

const router = Router()

router.post(
  "/",
  verifyToken,
  authorizePermission(Permission.ADD_PRODUCT),
  validateFilesUpload({
    dynamicDestination: "public",
    acceptedFileTypes: ["jpg", "png", "jpeg"],
    fileName: "product_url",
    filePrefix: "product_pict_url",
    maxSize: 5 * 1024 * 1024,
  }),
  productController.createProduct
)

router.get("/", productController.getAllProduct)
router.get("/:id", productController.getProductById)

router.put(
  "/:id",
  verifyToken,
  authorizePermission(Permission.EDIT_PRODUCT),
  verifyAdminOwnership,
  productController.updatePrice
)

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

router.post(
  "/:id/image",
  verifyToken,
  authorizePermission(Permission.ADD_PRODUCT),
  verifyAdminOwnership,
  validateMaxLengthImage,
  validateFilesUpload({
    dynamicDestination: "public",
    acceptedFileTypes: ["jpg", "png", "jpeg"],
    fileName: "product_url",
    filePrefix: "product_pict_url",
    maxSize: 5 * 1024 * 1024,
  }),
  productImageController.addImage
)

router.delete(
  "/:id/image",
  verifyToken,
  authorizePermission(Permission.DELETE_PRODUCT),
  verifyAdminOwnership,
  productImageController.deleteImage
)

export default router
