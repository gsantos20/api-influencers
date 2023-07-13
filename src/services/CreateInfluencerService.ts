import { IInfluencersRepository, MongoInfluencer } from '@repositories/IInfluencersRepositories'
import { Influencer } from '@models/Influencer'

export class CreateInfluencerService {
  constructor(private readonly influencerRepository: IInfluencersRepository) {}
  async execute(params: MongoInfluencer): Promise<Influencer | Error> {
    const existInfluencer = await this.influencerRepository.findInfluencer(params.email)

    if (existInfluencer) {
      throw new Error('Influencer already exists')
    }

    const influencer = await this.influencerRepository.createInfluencer(params)

    if (!influencer) {
      throw new Error('Influencer not created')
    }

    return influencer
  }
}
