import { Request, Response } from "express"
import {
  createCategory,
  editCategory,
  getCategoryById,
} from "../services/categoryService"
import { PrismaError } from "../enum/dataBaseError"

const categoryController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name } = req.body
      await createCategory(name)

      return res.status(200).json({
        message: "Successfully create new category!",
      })
    } catch (err: any) {
      if (
        err.code === PrismaError.UNIQUE_CONSTRAINT &&
        err.meta?.target === PrismaError.TARGET_CATEGORY
      ) {
        return res.status(400).json({
          message: "Category name already exist!",
        })
      }
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  edit: async (req: Request, res: Response) => {
    try {
      const { categoryId, name } = req.body

      if (!categoryId || !name) {
        return res.status(400).json({
          message: "Input must be filled!",
        })
      }

      const findCategoryName = await getCategoryById(categoryId)

      if (findCategoryName?.name === name) {
        return res.status(400).json({
          message: "Category name is already exist!",
        })
      }

      await editCategory(categoryId, name)
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default categoryController
