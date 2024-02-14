import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const searchProductData = async (
  product: string,
  category: string,
  pagesize: number,
  offset: number
) => {
  return await prisma.product.findMany({
    take: pagesize,
    skip: offset,
    where: {
      name: product,
    },
    include: {
      Category: {
        where: {
          name: category,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })
}

export { searchProductData }
