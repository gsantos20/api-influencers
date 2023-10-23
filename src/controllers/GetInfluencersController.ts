/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Influencer } from '@models/Influencer'
import { GetInfluencersService } from '@services/GetInfluencersService'
import { Request, Response } from 'express'
import { pick } from 'lodash'

export class GetInfluencersController {
  constructor(private getInfluencersService: GetInfluencersService) {}

  async handle(request: Request, response: Response) {
    const params = pick(request.query as Partial<Influencer>, [
      'NameInfluencer',
      'EmailInfluencer',
      'ChannelUsername',
      'PlatformId',
      'NumSubs',
      'ContentCategory'
    ])

    const result = await this.getInfluencersService.execute(params)

    return response.json({ success: true, data: result }).status(200)
  }
}
