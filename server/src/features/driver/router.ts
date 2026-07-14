import Express from "express"
import * as controller from './controller.js'

const driverRouter = Express.Router()

driverRouter.get('/', controller.getAll)

driverRouter.get('/:id',controller.getById)

driverRouter.post('/',controller.create)

driverRouter.patch('/:id',controller.update)

driverRouter.delete('/:id',controller.remove)