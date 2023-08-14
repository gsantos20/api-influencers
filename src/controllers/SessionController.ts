import { Request, Response } from 'express'
import { SessionService } from '@services/SessionService'
import { User } from '@models/User'
import _ from 'lodash'
import { Login } from '@models/Login'

export class SessionController {
  constructor(private sessionService: SessionService) {}
  async handle(request: Request, response: Response) {
    const queryParams = request.body as Login

    const requiredFields = ['email', 'password']

    for (const field of requiredFields) {
      if (!queryParams[field as keyof User]?.length) {
        throw new Error(`Campo ${field} é obrigatório`)
      }
    }

    const result = await this.sessionService.execute(queryParams)

    return response.json({ success: true, data: result })
  }
}
