import express, { Router } from 'express'
import { GetInfluencersController } from '@controllers/GetInfluencerController'
import { CreateInfluencerController } from '@controllers/CreateInfluencerController'
import { MongoInfluencersRepository } from '@repositories/mongo/MongoInfluencersRepository'

const influencerRoutes: Router = express.Router()
require('express-async-errors')

const mongoInfluencerRepository = new MongoInfluencersRepository()

influencerRoutes.get('/', async (req, res) => {
  const getInfluencersController = new GetInfluencersController(
    mongoInfluencerRepository
  )

  return getInfluencersController.handle(req, res)
})

influencerRoutes.post('/', async (req, res) => {
  const createInfluencerController = new CreateInfluencerController(
    mongoInfluencerRepository
  )

  return createInfluencerController.handle(req, res)
})

export default influencerRoutes
