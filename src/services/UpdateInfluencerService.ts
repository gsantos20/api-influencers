import { IInfluencersRepository, MongoInfluencer } from '@repositories/IInfluencersRepositories'
import { WithId } from 'mongodb'

export class UpdateInfluencerService {
  constructor(private readonly influencerRepository: IInfluencersRepository) {}
  async execute(_id: string, params: MongoInfluencer): Promise<WithId<MongoInfluencer> | Error> {
    const existInfluencer = await this.influencerRepository.findInfluencerById(_id)

    if (!existInfluencer) {
      throw new Error('Influencer does not exists')
    }

    const usedEmail = await this.influencerRepository.findInfluencer(params.email)

    if (usedEmail && usedEmail._id.toString() !== _id) {
      throw new Error('Influencer Email already in use')
    }

    const influencer = await this.influencerRepository.updateInfluencer(_id, params)

    if (!influencer) {
      throw new Error('Influencer not updated')
    }

    return influencer
  }
}
