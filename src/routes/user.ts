import { ensuredAuthenticated } from '@middlewares/ensuredAuthenticated';
import express, { Router } from 'express'
import { CreateUserController } from '@controllers/CreateUserController'
import { CreateUserService } from '@services/CreateUserService'
import { MongoUsersRepository } from '@repositories/mongo/MongoUsersRepository'

import { DeleteUserService } from '@services/DeleteUserService'
import { DeleteUserController } from '@controllers/DeleteUserController'

const userRoutes: Router = express.Router()
require('express-async-errors')

const mongoUsersRepository = new MongoUsersRepository()

// userRoutes.get('/users', async (req: Request, res: Response) => {
//   const getUserController = new GetUsersController(mongoUsersRepository)

//   getUserController.handle(req, res)
// })

userRoutes.post('/user', async (req, res) => {
  const createUserService = new CreateUserService(mongoUsersRepository)
  const createUserController = new CreateUserController(createUserService)

  return createUserController.handle(req, res)
})

userRoutes.delete('/user/:_id', ensuredAuthenticated(), async (req, res) => {
  const deleteUserService = new DeleteUserService(mongoUsersRepository)
  const deleteUserController = new DeleteUserController(deleteUserService)

  return deleteUserController.handle(req, res)
})


export default userRoutes
