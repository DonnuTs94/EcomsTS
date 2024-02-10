import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { getCategoryById } from "../services/categoryService"
import { createMultipleImages } from "../services/productImageService"
import {
  getAllProduct,
  getProductById,
  getTotalProduct,
} from "../services/productService"

const prisma = new PrismaClient()

const productController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const { name, price, description, quantity } = req.body
      const categoryId = req.body.categoryId

      const files = req.files as Express.Multer.File[]
      let imagesPath: string[] = []

      const foundCategoryId = await getCategoryById(categoryId)

      if (!foundCategoryId) {
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
          categoryId: Number(foundCategoryId?.id),
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
          productImage: true,
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
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getProductById: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id)

      const productData = await getProductById(productId)

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
}

export default productController
