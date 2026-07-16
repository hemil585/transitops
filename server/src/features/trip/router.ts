import Express, { Router } from "express"
import * as controller from './controller.js'

export const tripRouter: Router = Express.Router()

tripRouter.get('/', controller.getAll)

tripRouter.get('/:id', controller.getOne)

tripRouter.post('/', controller.create)