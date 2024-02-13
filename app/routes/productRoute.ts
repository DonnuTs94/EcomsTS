import { Router } from "express"
import { authorizePermission, verifyToken } from "../middlewares/authMiddleware"
import { Permission } from "../enum/authorization"
import productController from "../controllers/productController"
import { verifyAdminOwnership } from "../middlewares/productMiddleware"
import productImageController from "../controllers/productImageController"
import {
  validateFilesUpload,
  validateMaxLengthImage,
} from "../middlewares/imageValidator"
import {
  FILE_NAME,
  FILE_PREFIX,
  FILE_TYPE,
  PATH,
  SIZE_5MB,
} from "../constant/uploader"

const router = Router()

router.post(
  "/",
  verifyToken,
  authorizePermission(Permission.ADD_PRODUCT),
  validateFilesUpload({
    dynamicDestination: PATH,
    acceptedFileTypes: FILE_TYPE,
    fileName: FILE_NAME,
    filePrefix: FILE_PREFIX,
    maxSize: SIZE_5MB,
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
    dynamicDestination: PATH,
    acceptedFileTypes: FILE_TYPE,
    fileName: FILE_NAME,
    filePrefix: FILE_PREFIX,
    maxSize: SIZE_5MB,
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
