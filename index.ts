import { app } from "./app"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()

const port = process.env.APP_PORT || 3000

const server = app.listen(port, () => {
  // if (!fs.existsSync("public")) {
  //   fs.mkdirSync("public")
  // }
  console.log(`Server is running on port ${port}`)
})

server.on("ERROR", (err: Error) => {
  console.error(`Error: ${err.message}`)
})
