import { Request, Response, NextFunction } from "express"
import multer from "multer"
import fs from "fs"
import { UploadOptions } from "../interface/uploaderInterface" // Assuming you have an interface for upload options
import { upload } from "../lib/uploader"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const validateFilesUpload = (options: UploadOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public", { recursive: true })
    }

    const handleMulterError = (err: any) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "File too large",
          })
        } else {
          return res.status(400).json({
            message: "File upload error: " + err.message,
          })
        }
      } else if (err) {
        return res.status(400).json({
          message: "File upload error: " + err.message,
        })
      }

      if (Array.isArray(req.files) && req.files.length > 6) {
        req.files.forEach((file: Express.Multer.File) => {
          fs.unlinkSync(file.path)
        })
        return res.status(400).json({
          message: "Too many files uploaded. Maximum allowed is 6",
        })
      }

      next()
    }
    const uploadMiddleware = upload({
      acceptedFileTypes: options.acceptedFileTypes,
      filePrefix: options.filePrefix,
      maxSize: options.maxSize,
      dynamicDestination: options.dynamicDestination,
    })

    uploadMiddleware(req, res, (err: any) => {
      handleMulterError(err)
    })
  }
}

const validateMaxLengthImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productImageLength = await prisma.productImages.findMany({
    where: {
      productId: Number(req.params.id),
    },
  })

  const maxImageLength = 6

  if (productImageLength.length < maxImageLength) {
    next()
  } else {
    return res.status(400).json({
      message: "You have maximum images files",
    })
  }
}

export { validateFilesUpload, validateMaxLengthImage }
