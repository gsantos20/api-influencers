import { Request, Response } from 'express'
import { SessionService } from '@services/SessionService'
import { User } from '@models/User'
import _ from 'lodash'
import { Login } from '@models/Login'

export class SessionController {
  constructor(private sessionService: SessionService) {}
  async handle(request: Request, response: Response) {
    const queryParams = Object.keys(request.body).reduce((acc, key) => {
      acc[_.capitalize(key)] = request.body[key]
      return acc
    }, {} as Login)

    const requiredFields = ['Email', 'Password']

    for (const field of requiredFields) {
      if (!queryParams[field as keyof User]?.length) {
        throw new Error(`Campo ${field} é obrigatório`)
      }
    }

    const result = await this.sessionService.execute(queryParams)

    return response.json({ success: true, data: result })
  }
}
