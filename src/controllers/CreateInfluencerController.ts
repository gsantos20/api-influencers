/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MongoInfluencer } from '@repositories/IInfluencersRepositories'
import { CreateInfluencerService } from '@services/CreateInfluencerService'
import { Request, Response } from 'express'
import validator from 'validator'

export class CreateInfluencerController {
  constructor(private createInfluencerService: CreateInfluencerService) {}

  async handle(request: Request, response: Response) {
    const requiredFields = [
      'NameInfluencer',
      'EmailInfluencer',
      'ChannelUsername',
      'PlatformId',
      'NumSubs',
      'ContentCategory'
    ]

    requiredFields.forEach((el: string) => {
      if (!request.body[el as keyof MongoInfluencer]) {
        throw new Error(`Campo ${el} é obrigatório`)
      }
    })

    const influencer: MongoInfluencer = { ...request.body }

    const emailIsValid = validator.isEmail(influencer.EmailInfluencer)

    if (!emailIsValid) {
      throw new Error('E-mail do influenciador é invalido')
    }

    const result = await this.createInfluencerService.execute(request.body)

    return response.json({ success: true, data: result }).status(201)
  }
}
