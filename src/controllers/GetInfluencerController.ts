/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express'
import { Influencer } from '@models/Influencer'
import { pick } from 'lodash'
import { IInfluencersRepository } from '@repositories/IInfluencersRepositories'

export class GetInfluencersController {
  constructor(private readonly InfluencersRepository: IInfluencersRepository) {}

  async handle(request: Request, response: Response) {
    const params = pick(request.query as Partial<Influencer>, [
      'firstName',
      'lastName',
      'email'
    ])

    const filter = Object.keys(params).reduce((obj, key) => {
      obj[key] = { $regex: params[key], $options: 'i' }
      return obj
    }, {})

    const influencers = await this.InfluencersRepository.getInfluencers(filter)

    return response.json(influencers).status(200)
  }
}
