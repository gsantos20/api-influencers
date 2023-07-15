import { Influencer } from '@models/Influencer'
import { IInfluencersRepository } from '@repositories/IInfluencersRepositories'

export class GetInfluencersService {
  constructor(private readonly influencersRepository: IInfluencersRepository) {}
  async execute(params: Partial<Influencer>): Promise<Influencer[] | Error> {
    const filter = Object.keys(params).reduce((obj, key) => {
      const value = params[key]

      if (/^-?\d+$/.test(value)) {
        obj[key] = { $eq: parseInt(value) }
      } else if (/^(true|false)$/i.test(value)) {
        obj[key] = { $e: value.toLowerCase() === 'true' ? true : false }
      } else {
        obj[key] = { $regex: value, $options: 'i' }
      }

      return obj
    }, {})

    const influencers = await this.influencersRepository.getInfluencers(filter)

    return influencers
  }
}
