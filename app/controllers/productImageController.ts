import { Request, Response } from "express"
import fs from "fs"
import {
  createProductImage,
  deleteProductImage,
  getAllProductImages,
} from "../services/productImagesService"

const productImageController = {
  addImage: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id)
      const files = req.files as Express.Multer.File[]

      if (files.length > 1) {
        files.map((file) => {
          fs.unlinkSync(file.path)
        })

        return res.status(400).json({
          message: "Only allowed 1 image upload",
        })
      }

      const productImageData = files.map((file) => {
        return file.filename
      })

      await createProductImage(productImageData[0], productId)

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

      const productImageData = (await getAllProductImages(productId)).map(
        (image) => {
          return image.id
        }
      )

      if (!productImageData.includes(productImageId)) {
        return res.status(400).json({
          message: "Image does'nt exist!",
        })
      }

      const imageData = await deleteProductImage(productImageId)

      const imagePath = "public/" + imageData.imageUrl

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
        return res.status(200).json({
          message: "Successfully delete image",
        })
      } else {
        return res.status(400).json({
          message: "Image file not found!",
        })
      }
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default productImageController
