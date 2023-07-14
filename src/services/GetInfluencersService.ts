import { Influencer } from '@models/Influencer'
import { IInfluencersRepository } from '@repositories/IInfluencersRepositories'

export class GetInfluencersService {
  constructor(private readonly influencersRepository: IInfluencersRepository) {}
  async execute(params: Partial<Influencer>): Promise<Influencer[] | Error> {
    const filter = Object.keys(params).reduce((obj, key) => {
      obj[key] = { $regex: params[key], $options: 'i' }
      return obj
    }, {})

    const influencers = await this.influencersRepository.getInfluencers(filter)

    return influencers
  }
}
