import { PrismaClient } from "@prisma/client"
import { ProductImagesData } from "../interface/imagesInterface"

const prisma = new PrismaClient()

const createMultipleImages = async (productImagesData: ProductImagesData[]) => {
  await prisma.productImages.createMany({
    data: productImagesData,
  })
}

export { createMultipleImages }
