import multer, { DiskStorageOptions, Multer, StorageEngine } from "multer"
import { Request } from "express"
import { UploadOptions } from "../interface/uploaderInterface"

const upload = (options: UploadOptions) => {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dynamicPath = options.dynamicDestination
      cb(null, dynamicPath)
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const { originalname } = file
      options.fileName = originalname + Date.now()
      cb(
        null,
        `${options.filePrefix}-${options.fileName}.${
          file.mimetype.split("/")[1]
        }`
      )
    },
  })

  const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
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
  })
}

export { upload }
