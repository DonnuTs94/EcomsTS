import { Request, Response } from "express"
import fs from "fs"
import {
  createMultipleImages,
  deleteProductImage,
  getAllProductImages,
} from "../services/productImagesService"

const productImageController = {
  addImage: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id)
      const files = req.files as Express.Multer.File[]

      const productImageData = files.map((file) => ({
        imageUrl: file.filename,
        productId,
      }))

      if (productImageData.length > 1) {
        return res.status(400).json({
          message: "You can only post 1 image",
        })
      }

      await createMultipleImages(productImageData)

      return res.status(200).json({
        message: "Successfully add new product image",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  deleteImage: async (req: Request, res: Response) => {
    try {
      const { productImageId } = req.body
      const productId = Number(req.params.id)

      const productImage = (await getAllProductImages(productId)).map(
        (image) => {
          return image.id
        }
      )

      if (productImage !== productImageId) {
        return res.status(400).json({
          message: "Image does'nt exist!",
        })
      }

      const imageData = await deleteProductImage(productImageId)

      fs.unlinkSync("public/" + imageData.imageUrl)

      return res.status(200).json({
        message: "Successfully delete product image",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default productImageController
