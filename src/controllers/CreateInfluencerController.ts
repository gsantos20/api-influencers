/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import validator from 'validator'
import { Influencer } from '../models/Influencer'
import { IInfluencersRepository } from '@repositories/IInfluencersRepositories'

export class CreateInfluencerController {
  constructor(private readonly InfluencerRepository: IInfluencersRepository) {}

  async handle(request: Request, response: Response) {
    const requiredFields = ['firstName', 'lastName', 'email', 'password']

    for (const field of requiredFields) {
      if (!request?.body?.[field as keyof Influencer]?.length) {
        throw new Error(`Field ${field} is required`)
      }
    }

    const emailIsValid = validator.isEmail(request.body!.email)

    if (!emailIsValid) {
      throw new Error('E-mail is invalid')
    }

    const influencer = await this.InfluencerRepository.createInfluencer(
      request.body!
    )

    return response.json(influencer)
  }
}
