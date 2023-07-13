/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import validator from 'validator'
import { CreateInfluencerService } from '@services/CreateInfluencerService'
import { MongoInfluencer } from '@repositories/IInfluencersRepositories'

export class CreateInfluencerController {
  constructor(private createInfluencerService: CreateInfluencerService) {}

  async handle(request: Request, response: Response) {
    const requiredFields = [
      'NameInfluencer',
      'EmailInfluencer',
      'ChannelUsername',
      'PlatformId',
      'NumSubs',
      'ContentCategoryId'
    ]

    requiredFields.forEach((el: string) => {
      if (!request.body[el as keyof MongoInfluencer]) {
        throw new Error(`Field ${el} is required`)
      }
    })

    const influencer: MongoInfluencer = { ...request.body }

    const emailIsValid = validator.isEmail(influencer.EmailInfluencer)

    if (!emailIsValid) {
      throw new Error('E-mail Influencer is invalid')
    }

    const result = await this.createInfluencerService.execute(request.body)

    return response.json(result)
  }
}
