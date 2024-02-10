import { PrismaClient } from "@prisma/client"
import { ProductImagesData } from "../interface/imagesInterface"

const prisma = new PrismaClient()

const createMultipleImages = async (productImagesData: ProductImagesData[]) => {
  await prisma.productImages.createMany({
    data: productImagesData,
  })
}

const getAllProductImages = async (productId: number) => {
  return await prisma.productImages.findMany({
    where: {
      productId: productId,
    },
  })
}

const deleteProductImage = async (imageId: number) => {
  return await prisma.productImages.delete({
    where: {
      id: imageId,
    },
  })
}

export { getAllProductImages, deleteProductImage, createMultipleImages }
