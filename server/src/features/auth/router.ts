import express, { type Router } from 'express'
import { signin } from './controller.js'

export const authRouter: Router = express.Router()

authRouter.post('/signin', signin)