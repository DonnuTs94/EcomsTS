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
      const fileName = originalname + Date.now() // Ensure each filename is unique
      cb(
        null,
        `${options.filePrefix}-${fileName}.${file.mimetype.split("/")[1]}`
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

  // Use .array() if you want to accept multiple files, or .single() for a single file
  return multer({
    storage: diskStorage,
    fileFilter,
    limits: { fileSize: options.maxSize },
  }).any() // Change .any() to .array() or .single() as needed
}

export { upload }
