/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import routes from './routes/routes'
import { MongoClient } from './database/mongo'

const app = express()

async function main() {
  config()

  app.use(cors())
  app.use(express.json())

  await MongoClient.connect()

  app.use('/api/v1/', routes)

  routes.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return res.status(400).json({
        error: true,
        message: err.message
      })
    }
    res.status(500).json({
      status: 'error',
      message: `Internal server error - ${err}`
    })
  })
}

main()

export { app }
