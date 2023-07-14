/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express'
import { Influencer } from '@models/Influencer'
import { pick } from 'lodash'
import { GetInfluencersService } from '@services/GetInfluencersService'
import validator from 'validator'
import { MongoInfluencer } from '@repositories/IInfluencersRepositories'

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

    const influencers = await this.getInfluencersService.execute(params)

    return response.json(influencers).status(200)
  }
}
