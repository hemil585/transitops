import "dotenv/config"
import express from "express"
import { env } from "./config/env.js"
import cookieParser from "cookie-parser";
import { authRouter } from "./features/auth/router.js";
import { vehicleRouter } from "./features/vehicle/router.js";
import { driverRouter } from "./features/driver/router.js";
import { tripRouter } from "./features/trip/router.js";

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/vehicle', vehicleRouter)
app.use('/driver', driverRouter)
app.use('/trip', tripRouter)

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`)
})