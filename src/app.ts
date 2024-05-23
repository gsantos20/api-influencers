/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express'
import { config } from 'dotenv'
import cors, { CorsOptions } from 'cors'
import routes from './routes/routes'
import bodyParserErrorHandler from 'express-body-parser-error-handler'
import { queryParser } from 'express-query-parser'

const app = express()

async function main() {
  config()

  const corOptions: CorsOptions = {
    origin: '*'
  }

  app.use(cors(corOptions))
  app.use(express.json())
  app.use(bodyParserErrorHandler())

  app.use(
    queryParser({
      parseNull: true,
      parseUndefined: true,
      parseBoolean: true,
      parseNumber: true
    })
  )

  app.use('/api/v1/', routes)

  app.use((req, res) => {
    if (req.path === '/') {
      return res.redirect('/api/v1/')
    }

    res.status(404).json({
      success: false,
      data: 'Page not found'
    })
  })

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return res.status(400).json({
        success: false,
        data: err.message
      })
    }

    res.status(500).json({
      success: false,
      data: `Internal server error - ${err}`
    })

    next()
  })
}

main()

export { app }
