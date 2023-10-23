/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response, Router } from 'express'
import { methodNotAllowed } from '@middlewares/methodNotAllowed'
import userRoutes from './user'
import influencerRoutes from './influencer'

import { ensuredAuthenticated } from '@middlewares/ensuredAuthenticated'
import { GetPlatformController } from '@controllers/GetPlatformsController'
import { GetPlatformsService } from '@services/GetPlatformsService'

const routes: Router = express.Router()

routes.use('/', userRoutes)

routes.use('/', influencerRoutes)

routes.get('/platforms', ensuredAuthenticated(), async (req, res) => {
  const getPlatformService = new GetPlatformsService()
  const getPlatformController = new GetPlatformController(getPlatformService)

  return getPlatformController.handle(req, res)
})

routes.all('/platforms', methodNotAllowed)

export default routes
