import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const findUsersByRole = async (roleName) => {
  const role = await prisma.role.findFirst({
    where: {
      name: roleName,
    },
  })
  return role?.id
}

const findUserWithRoleSeller = async (roleId) => {
  const usersWithRole = await prisma.user.findMany({
    where: {
      roleId: roleId,
    },
  })
  return usersWithRole.map((user) => user.id)
}

const main = async () => {
  try {
    // Find users with role 'seller' dynamically
    const roleId = await findUsersByRole("seller")
    const sellerIds = await findUserWithRoleSeller(roleId)
    console.log("Found seller IDs:", sellerIds)

    // Assume we have 3 sellers now, and we want each seller to have 3 products
    const products = []
    for (const sellerId of sellerIds) {
      for (let i = 1; i <= 3; i++) {
        const product = {
          name: `Product ${i} for Seller ${sellerId}`,
          price: 10.99 + i,
          description: `Description for Product ${i}`,
          quantity: 100,
          categoryId: 6, // Assuming categoryId is fixed for all products
          userId: sellerId,
        }
        products.push(product)
      }
    }

    // Create products for each seller
    const productIds = []
    for (const product of products) {
      const createdProduct = await prisma.product.create({
        data: product,
      })
      productIds.push(createdProduct.id)
    }

    // Create product images using the extracted product IDs
    const productImagesData = productIds
      .map((productId) => {
        return [
          { imageUrl: `images/${productId}/1.jpg`, productId },
          { imageUrl: `images/${productId}/2.jpg`, productId },
          { imageUrl: `images/${productId}/3.jpg`, productId },
        ]
      })
      .flat()

    await prisma.productImages.createMany({
      data: productImagesData,
    })

    console.log("Products and product images created successfully.")
  } catch (error) {
    console.error("Error creating products and product images:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
