import express from "express"
import cors from "cors"
import mainRoutes from "./app/routes/mainRoute"

const app = express()

app.use(cors())
app.use(express.json())

app.use(mainRoutes)

export { app }
