import multer from "multer"
import { Request } from "express"
import { UploadOptions } from "../interface/uploaderInterface"

const upload = (options: UploadOptions) => {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dynamicPath = options.dynamicDestination
      cb(null, dynamicPath)
    },
    filename: (req, file, cb) => {
      const { originalname } = file
      const timestamp = Date.now()
      const fileNameWithoutExtension = originalname.substring(
        0,
        originalname.lastIndexOf(".")
      )
      cb(
        null,
        `${options.filePrefix}-${fileNameWithoutExtension}-${timestamp}.${
          file.mimetype.split("/")[1]
        }`
      )
    },
  })

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const extension = file.mimetype.split("/")[1]
    if (options.acceptedFileTypes?.includes(extension)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type"))
    }
  }

  return multer({
    storage: diskStorage,
    fileFilter,
    limits: { fileSize: options.maxSize },
  }).any()
}

export { upload }
