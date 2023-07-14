import { Request, Response } from 'express'
import { SessionService } from '@services/SessionService'
import { User } from '@models/User'

export class SessionController {
  constructor(private sessionService: SessionService) {}
  async handle(request: Request, response: Response) {
    const requiredFields = ['Username', 'Password']

    for (const field of requiredFields) {
      if (!request?.body?.[field as keyof User]?.length) {
        throw new Error(`Field ${field} is required`)
      }
    }

    const { username, password } = request.body

    const result = await this.sessionService.execute({ username, password })

    if (result instanceof Error) {
      throw new Error(result.message)
    }

    return response.json(result)
  }
}
