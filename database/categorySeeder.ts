import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
  try {
    await prisma.category.deleteMany()

    const categories = [
      "Electronics",
      "Clothing",
      "Books",
      "Home Decor",
      "Sports Equipment",
    ]

    // Loop through each category and create it in the database
    for (const categoryName of categories) {
      await prisma.category.create({
        data: {
          name: categoryName,
        },
      })
      console.log(`Category "${categoryName}" created successfully.`)
    }

    console.log("All categories created successfully.")
  } catch (error) {
    console.error("Error creating categories:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
