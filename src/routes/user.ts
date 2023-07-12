import express, { Router } from 'express'
import { CreateUserController } from '@controllers/CreateUserController'
import { CreateUserService } from '@services/CreateUserService'
import { MongoUsersRepository } from '@repositories/mongo/MongoUsersRepository'

const userRoutes: Router = express.Router()
require('express-async-errors')

const mongoUsersRepository = new MongoUsersRepository()

// userRoutes.get('/', async (req: Request, res: Response) => {
//   const getUserController = new GetUsersController(mongoUsersRepository)

//   getUserController.handle(req, res)
// })

userRoutes.post('/', async (req, res) => {
  const createUserService = new CreateUserService(mongoUsersRepository)
  const createUserController = new CreateUserController(createUserService)

  return createUserController.handle(req, res)
})

export default userRoutes
