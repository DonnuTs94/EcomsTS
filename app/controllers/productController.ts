import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import fs from "fs"
import { getCategoryById } from "../services/categoryService"
import {
  getAllProduct,
  getDataProductById,
  getTotalProduct,
  getProductId,
  hardDelete,
  softDelete,
  updatePrice,
} from "../services/productService"
import {
  createMultipleImages,
  getAllProductImages,
} from "../services/productImagesService"

const prisma = new PrismaClient()

const productController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      await prisma.$transaction(async () => {
        const { name, price, description, quantity } = req.body
        const categoryId = req.body.categoryId

        if (!name || !price || !description || !quantity || !categoryId) {
          return res.status(400).json({
            message: "Input must be filled",
          })
        }

        const files = req.files as Express.Multer.File[]
        let imagesPath: string[] = []

        const findCategoryId = await getCategoryById(categoryId)

        if (!findCategoryId) {
          return res.status(400).json({
            message: "Category does'nt exist!",
          })
        }

        const createProductData = await prisma.product.create({
          data: {
            name,
            price: Number(price),
            description,
            quantity: Number(quantity),
            categoryId: Number(findCategoryId?.id),
            userId: req.user?.id,
          },
        })

        if (files && files.length > 0) {
          imagesPath = files.map((file) => file.filename)
          const productImagesData = imagesPath.map((item) => {
            return {
              imageUrl: item,
              productId: createProductData.id,
            }
          })

          await createMultipleImages(productImagesData)
        }

        const dataResult = await prisma.product.findFirst({
          where: {
            id: createProductData.id,
          },
          include: {
            ProductImage: true,
            User: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        })

        return res.status(200).json({
          message: "Successfully create new product!",
          data: dataResult,
        })
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getProductById: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id)

      const productData = await getDataProductById(productId)

      if (!productData) {
        return res.status(400).json({
          message: "Product does'nt exist!",
        })
      }

      return res.status(200).json({
        message: "Successfully get product data!",
        data: productData,
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getAllProduct: async (req: Request, res: Response) => {
    try {
      const { page } = req.query

      const pageNumber = page ? parseInt(page as string, 10) : 1

      if (pageNumber < 1 || isNaN(pageNumber)) {
        return res.status(400).json({
          message: "Invalid page number: Page must be a positive integer",
        })
      }

      const pageSize = 5
      const offset = (pageNumber - 1) * Number(pageSize)

      const productData = await getAllProduct(pageSize, offset)

      const totalProducts = (await getTotalProduct()).length
      const totalPages = Math.ceil(totalProducts / pageSize)

      return res.status(200).json({
        message: "Successfully get all product!",
        data: productData,
        currentPage: page,
        totalPages: totalPages,
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  hardDelete: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id)

      const findProductId = await getProductId(productId)

      if (!findProductId) {
        return res.status(400).json({
          message: "Product does'nt exist!",
        })
      }
      const productImages = await getAllProductImages(findProductId.id)

      await hardDelete(findProductId.id)

      productImages.map((image) => {
        fs.unlinkSync("public/" + image.imageUrl)
      })

      return res.status(200).json({
        message: "Successfully delete product!",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  softDelete: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id)

      const findProductId = await getProductId(productId)

      if (!findProductId) {
        return res.status(400).json({
          message: "Product does'nt exist!",
        })
      }

      await softDelete(findProductId.id)

      return res.status(200).json({
        message: "Successfully delete product!",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  updatePrice: async (req: Request, res: Response) => {
    try {
      const { price } = req.body
      const productId = Number(req.params.id)

      if (price === 0) {
        return res.status(400).json({
          message: "price must higher than 0",
        })
      }

      if (!price) {
        return res.status(400).json({
          message: "input must be filled!",
        })
      }

      await updatePrice(productId, price)

      return res.status(200).json({
        message: "Successfully update price",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default productController
