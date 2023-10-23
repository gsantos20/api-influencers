import { CreateUserController } from '@controllers/CreateUserController'
import { DeleteUserController } from '@controllers/DeleteUserController'
import { GetUsersController } from '@controllers/GetUsersController'
import { SessionController } from '@controllers/SessionController'
import { ensuredAuthenticated } from '@middlewares/ensuredAuthenticated'
import { methodNotAllowed } from '@middlewares/methodNotAllowed'
import { PrismaUsersRepository } from '@repositories/prisma/PrismaUsersRepository'
import { CreateUserService } from '@services/CreateUserService'
import { DeleteUserService } from '@services/DeleteUserService'
import { GetUsersService } from '@services/GetUsersService'
import { SessionService } from '@services/SessionService'
import express, { Router } from 'express'

const userRoutes: Router = express.Router()
require('express-async-errors')

const prsimaUsersRepository = new PrismaUsersRepository()

userRoutes
  .get('/users', ensuredAuthenticated(), async (req, res) => {
    const getUsersService = new GetUsersService(prsimaUsersRepository)
    const getUsersController = new GetUsersController(getUsersService)

    getUsersController.handle(req, res)
  })
  .post('/user', async (req, res) => {
    const createUserService = new CreateUserService(prsimaUsersRepository)
    const createUserController = new CreateUserController(createUserService)

    return createUserController.handle(req, res)
  })
  .post('/login', async (req, res) => {
    const sessionService = new SessionService(prsimaUsersRepository)
    const sessionController = new SessionController(sessionService)

    return sessionController.handle(req, res)
  })
  .delete('/user/:id', ensuredAuthenticated(), async (req, res) => {
    const deleteUserService = new DeleteUserService(prsimaUsersRepository)
    const deleteUserController = new DeleteUserController(deleteUserService)

    return deleteUserController.handle(req, res)
  })

userRoutes.all('/', methodNotAllowed)

export default userRoutes
