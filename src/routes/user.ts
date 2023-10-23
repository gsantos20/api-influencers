import { ensuredAuthenticated } from '@middlewares/ensuredAuthenticated'
import { methodNotAllowed } from '@middlewares/methodNotAllowed'
import express, { Router } from 'express'
import { CreateUserController } from '@controllers/CreateUserController'
import { CreateUserService } from '@services/CreateUserService'
import { SessionService } from '@services/SessionService'
import { SessionController } from '@controllers/SessionController'
import { DeleteUserService } from '@services/DeleteUserService'
import { DeleteUserController } from '@controllers/DeleteUserController'
import { GetUsersService } from '@services/GetUsersService'
import { GetUsersController } from '@controllers/GetUsersController'
import { PrismaUsersRepository } from '@repositories/prisma/PrismaUsersRepository'

const userRoutes: Router = express.Router()

require('express-async-errors')

const prsimaUsersRepository = new PrismaUsersRepository()

userRoutes.get('/users', ensuredAuthenticated(), async (req, res) => {
  const getUsersService = new GetUsersService(prsimaUsersRepository)
  const getUsersController = new GetUsersController(getUsersService)

  getUsersController.handle(req, res)
})

userRoutes.post('/user', async (req, res) => {
  const createUserService = new CreateUserService(prsimaUsersRepository)
  const createUserController = new CreateUserController(createUserService)

  return createUserController.handle(req, res)
})

userRoutes.post('/login', async (req, res) => {
  const sessionService = new SessionService(prsimaUsersRepository)
  const sessionController = new SessionController(sessionService)

  return sessionController.handle(req, res)
})

userRoutes.delete('/user/:id', ensuredAuthenticated(), async (req, res) => {
  const deleteUserService = new DeleteUserService(prsimaUsersRepository)
  const deleteUserController = new DeleteUserController(deleteUserService)

  return deleteUserController.handle(req, res)
})

userRoutes.all('/users', methodNotAllowed)

userRoutes.all('/user', methodNotAllowed)

userRoutes.all('/login', methodNotAllowed)

export default userRoutes
