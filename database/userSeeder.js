import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const findRole = async () => {
  return await prisma.role.findMany()
}

const getRoleId = async (role) => {
  const roleData = await findRole()
  const foundRole = roleData.find((data) => data.name === role)

  return foundRole.id
}

const main = async () => {
  try {
    await prisma.user.deleteMany()

    const hashPassword = await bcrypt.hash("Password123!", 10)

    const users = [
      // Admin user
      {
        username: "admin",
        email: "admin@example.com",
        password: hashPassword,
        firstName: "Admin",
        lastName: "User",
        address: "Admin Address",
        roleId: await getRoleId("admin"),
      },
      // Seller users
      {
        username: "seller1",
        email: "seller1@example.com",
        password: hashPassword,
        firstName: "Seller",
        lastName: "User 1",
        address: "Seller Address 1",
        roleId: await getRoleId("seller"),
      },
      {
        username: "seller2",
        email: "seller2@example.com",
        password: hashPassword,
        firstName: "Seller",
        lastName: "User 2",
        address: "Seller Address 2",
        roleId: await getRoleId("seller"),
      },
      {
        username: "seller3",
        email: "seller3@example.com",
        password: hashPassword,
        firstName: "Seller",
        lastName: "User 3",
        address: "Seller Address 3",
        roleId: await getRoleId("seller"),
      },
      // Regular users
      {
        username: "user1",
        email: "user1@example.com",
        password: hashPassword,
        firstName: "Regular",
        lastName: "User 1",
        address: "User Address 1",
        roleId: await getRoleId("user"),
      },
      {
        username: "user2",
        email: "user2@example.com",
        password: hashPassword,
        firstName: "Regular",
        lastName: "User 2",
        address: "User Address 2",
        roleId: await getRoleId("user"),
      },
      {
        username: "user3",
        email: "user3@example.com",
        password: hashPassword,
        firstName: "Regular",
        lastName: "User 3",
        address: "User Address 3",
        roleId: await getRoleId("user"),
      },
      {
        username: "user4",
        email: "user4@example.com",
        password: hashPassword,
        firstName: "Regular",
        lastName: "User 4",
        address: "User Address 4",
        roleId: await getRoleId("user"),
      },
      {
        username: "user5",
        email: "user5@example.com",
        password: hashPassword,
        firstName: "Regular",
        lastName: "User 5",
        address: "User Address 5",
        roleId: await getRoleId("user"),
      },
    ]

    // Create users in the database
    await prisma.user.createMany({ data: users })

    console.log("Users created successfully.")
  } catch (error) {
    console.error("Error creating users:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
