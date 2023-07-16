import {
  IInfluencersRepository,
  MongoInfluencer
} from '@repositories/IInfluencersRepositories'
import { ObjectId, WithId } from 'mongodb'

export class UpdateInfluencerService {
  constructor(private readonly influencerRepository: IInfluencersRepository) {}
  async execute(
    _id: string,
    params: MongoInfluencer
  ): Promise<WithId<MongoInfluencer> | Error> {
    const objId = new ObjectId(_id)

    const existInfluencer = await this.influencerRepository.findInfluencer({
      _id: objId
    })

    if (!existInfluencer) {
      throw new Error('Influenciador não existe')
    }

    const usedEmail = await this.influencerRepository.findInfluencer({
      email: params.EmailInfluencer
    })

    if (usedEmail && usedEmail._id.toString() !== _id) {
      throw new Error('Email do influenciador está em uso')
    }

    const influencer = await this.influencerRepository.updateInfluencer(
      objId,
      params
    )

    if (!influencer) {
      throw new Error('Influenciador não foi atualizado')
    }

    return influencer
  }
}
