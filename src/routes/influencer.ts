import express, { Router } from 'express'
import { MongoInfluencersRepository } from '@repositories/mongo/MongoInfluencersRepository'

import { GetInfluencersController } from '@controllers/GetInfluencersController'

import { CreateInfluencerController } from '@controllers/CreateInfluencerController'
import { CreateInfluencerService } from '@services/CreateInfluencerService'

import { UpdateInfluencerService } from '@services/UpdateInfluencerService'
import { UpdateInfluencerController } from '@controllers/UpdateInfluencerController'
import { GetInfluencersService } from '@services/GetInfluencersService'
import { ensuredAuthenticated } from '@middlewares/ensuredAuthenticated'

const influencerRoutes: Router = express.Router()
require('express-async-errors')

const mongoInfluencerRepository = new MongoInfluencersRepository()

influencerRoutes.get(
  '/influencers',
  ensuredAuthenticated(),
  async (req, res) => {
    const getInfluencersService = new GetInfluencersService(
      mongoInfluencerRepository
    )
    const getInfluencersController = new GetInfluencersController(
      getInfluencersService
    )

    return getInfluencersController.handle(req, res)
  }
)

influencerRoutes.post(
  '/influencer',
  ensuredAuthenticated(),
  async (req, res) => {
    const createInfluencerService = new CreateInfluencerService(
      mongoInfluencerRepository
    )
    const createInfluencerController = new CreateInfluencerController(
      createInfluencerService
    )

    return createInfluencerController.handle(req, res)
  }
)

influencerRoutes.patch(
  '/influencer/:_id',
  ensuredAuthenticated(),
  async (req, res) => {
    const updateInfluencerService = new UpdateInfluencerService(
      mongoInfluencerRepository
    )
    const updateInfluencerController = new UpdateInfluencerController(
      updateInfluencerService
    )

    return updateInfluencerController.handle(req, res)
  }
)

export default influencerRoutes
