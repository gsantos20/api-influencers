/* eslint-disable @typescript-eslint/no-unused-vars */
import { methodNotAllowed } from '@middlewares/methodNotAllowed'
import express, { Router } from 'express'
import influencerRoutes from './influencer'
import userRoutes from './user'

import { GetPlatformController } from '@controllers/GetPlatformsController'
import { ensuredAuthenticated } from '@middlewares/ensuredAuthenticated'
import { GetPlatformsService } from '@services/GetPlatformsService'

const routes: Router = express.Router()

routes
  .use('/', userRoutes)
  .use('/', influencerRoutes)
  .get('/platforms', ensuredAuthenticated(), async (req, res) => {
    const getPlatformService = new GetPlatformsService()
    const getPlatformController = new GetPlatformController(getPlatformService)

    return getPlatformController.handle(req, res)
  })
  .all('/platforms', methodNotAllowed)
export default routes
