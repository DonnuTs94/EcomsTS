import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAllProductImages = async (productId: number) => {
  return await prisma.productImages.findMany({
    where: {
      productId: productId,
    },
  })
}

export { getAllProductImages }
