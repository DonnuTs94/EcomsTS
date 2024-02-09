import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const productController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const { name, price, description, quantity } = req.body
      const categoryId = req.body.categoryId

      const files = req.files as Express.Multer.File[]
      let imagesPath: string[] = []

      const foundCategoryId = await prisma.category.findFirst({
        where: {
          id: Number(categoryId),
        },
      })

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

        await prisma.productImages.createMany({
          data: productImagesData,
        })
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
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default productController
