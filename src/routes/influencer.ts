import { CreateInfluencerController } from '@controllers/CreateInfluencerController'
import { DeleteInfluencerController } from '@controllers/DeleteInfluencerController'
import { GetInfluencerByIdController } from '@controllers/GetInfluencerByIdController'
import { UpdateInfluencerController } from '@controllers/UpdateInfluencerController'
import { ensuredAuthenticated } from '@middlewares/ensuredAuthenticated'
import { methodNotAllowed } from '@middlewares/methodNotAllowed'
import { MongoInfluencersRepository } from '@repositories/mongo/MongoInfluencersRepository'
import { CreateInfluencerService } from '@services/CreateInfluencerService'
import { DeleteInfluencerService } from '@services/DeleteInfluencerService'
import { GetInfluencerByIdService } from '@services/GetInfluencerByIdService'
import { UpdateInfluencerService } from '@services/UpdateInfluencerService'
import express, { Router } from 'express'

const influencerRoutes: Router = express.Router()

require('express-async-errors')

const mongoInfluencerRepository = new MongoInfluencersRepository()

influencerRoutes
  .get('/influencer/:_id', ensuredAuthenticated(), async (req, res) => {
    const getInfluencerByIdService = new GetInfluencerByIdService(
      mongoInfluencerRepository
    )
    const getInfluencerByIdController = new GetInfluencerByIdController(
      getInfluencerByIdService
    )

    return getInfluencerByIdController.handle(req, res)
  })
  .post('/influencer', ensuredAuthenticated(), async (req, res) => {
    const createInfluencerService = new CreateInfluencerService(
      mongoInfluencerRepository
    )
    const createInfluencerController = new CreateInfluencerController(
      createInfluencerService
    )

    return createInfluencerController.handle(req, res)
  })
  .patch('/influencer/:_id', ensuredAuthenticated(), async (req, res) => {
    const updateInfluencerService = new UpdateInfluencerService(
      mongoInfluencerRepository
    )
    const updateInfluencerController = new UpdateInfluencerController(
      updateInfluencerService
    )

    return updateInfluencerController.handle(req, res)
  })
  .delete('/influencer/:_id', ensuredAuthenticated(), async (req, res) => {
    const deleteInfluencerService = new DeleteInfluencerService(
      mongoInfluencerRepository
    )
    const deleteInfluencerController = new DeleteInfluencerController(
      deleteInfluencerService
    )

    return deleteInfluencerController.handle(req, res)
  })
  .all('/influencers', methodNotAllowed)
  .all('/influencer', methodNotAllowed)

export default influencerRoutes
