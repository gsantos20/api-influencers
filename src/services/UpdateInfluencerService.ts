import { IInfluencersRepository, MongoInfluencer } from '@repositories/IInfluencersRepositories'
import { ObjectId, WithId } from 'mongodb'

export class UpdateInfluencerService {
  constructor(private readonly influencerRepository: IInfluencersRepository) {}
  async execute(_id: string, params: MongoInfluencer): Promise<WithId<MongoInfluencer> | Error> {

    const objId = new ObjectId(_id)

    const existInfluencer = await this.influencerRepository.findInfluencer({_id: objId})

    if (!existInfluencer) {
      throw new Error('Influencer does not exists')
    }

    const usedEmail = await this.influencerRepository.findInfluencer({ email: params.email })

    if (usedEmail && usedEmail._id.toString() !== _id) {
      throw new Error('Influencer Email already in use')
    }

    const influencer = await this.influencerRepository.updateInfluencer(objId, params)

    if (!influencer) {
      throw new Error('Influencer not updated')
    }

    return influencer
  }
}
