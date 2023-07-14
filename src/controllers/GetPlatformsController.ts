import { Request, Response } from 'express'
import { pick } from 'lodash'
import { Platform } from '@models/Platform'
import { GetPlatformsService } from '@services/GetPlatformsService'

export class GetPlatformController {
  constructor(private getPlatformsService: GetPlatformsService) {}
  async handle(request: Request, response: Response) {
    const params = pick(request.query as Partial<Platform>, [
      'PlatformId',
      'PlatformDs',
      'Active'
    ])

    const result = await this.getPlatformsService.execute(params)

    return response.json({ success: true, data: result })
  }
}
