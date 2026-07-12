import "dotenv/config"
import express from "express"
import { env } from "./config/env.js"
import cookieParser from "cookie-parser";
import { authRouter } from "./features/auth/router.js";

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`)
})