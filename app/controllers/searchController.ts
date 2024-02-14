import { Request, Response } from "express"
import { searchProductData } from "../services/searchService"

const searchController = {
  searchProduct: async (req: Request, res: Response) => {
    try {
      const { product, category, page } = req.query

      const pageNumber = page ? parseInt(page as string, 10) : 1

      if (pageNumber < 1 || isNaN(pageNumber)) {
        return res.status(400).json({
          message: "Invalid page number: Page must be a positive integer",
        })
      }

      const pageSize = 5
      const offset = (pageNumber - 1) * Number(pageSize)

      const searchData = await searchProductData(
        product as string,
        category as string,
        pageSize,
        offset
      )

      return res.status(200).json({
        message: "Success",
        data: searchData,
      })
    } catch (err: any) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

export default searchController
