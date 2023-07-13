/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response, Router } from 'express'
import userRoutes from './user'
import influencerRoutes from './influencer'
import { SessionService } from '@services/SessionService'
import { SessionController } from '@controllers/SessionController'
import { MongoUsersRepository } from '@repositories/mongo/MongoUsersRepository'
import { ensuredAuthenticated } from '@middlewares/ensuredAuthenticated'
import { GetPlatformController } from '@controllers/GetPlatformsController'
import { GetPlatformsService } from '@services/GetPlatformsService'
import { GetContentCategoriesService } from '@services/GetContentCategoriesService'
import { GetContentCategoriesController } from '@controllers/GetContentCaregories'

const routes: Router = express.Router()

routes.get('/platforms', async (req, res) => {
  const getPlatformService = new GetPlatformsService()
  const getPlatformController = new GetPlatformController(getPlatformService)

  return getPlatformController.handle(req, res)
})

routes.get('/categories', async (req, res) => {
  const getContentCategoriesService = new GetContentCategoriesService()
  const getContentCategoriesController = new GetContentCategoriesController(
    getContentCategoriesService
  )

  return getContentCategoriesController.handle(req, res)
})

routes.post('/login', async (req, res) => {
  const mongoUsersRepository = new MongoUsersRepository()

  const sessionService = new SessionService(mongoUsersRepository)
  const sessionController = new SessionController(sessionService)

  return sessionController.handle(req, res)
})

routes.use('/', userRoutes)

routes.use('/', ensuredAuthenticated(), influencerRoutes)

export default routes
