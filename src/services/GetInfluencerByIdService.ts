import { Influencer } from '@models/Influencer'
import { IInfluencersRepository } from '@repositories/IInfluencersRepositories'
import { ObjectId } from 'mongodb'

export class GetInfluencerByIdService {
  constructor(private readonly influencerRepository: IInfluencersRepository) {}
  async execute(_id: string): Promise<Influencer | Error> {
    const objId = new ObjectId(_id)
    const influencer = await this.influencerRepository.findInfluencer({
      _id: objId
    })

    if (!influencer) {
      throw new Error('Influenciador não existe')
    }

    return influencer
  }
}
