import {
  IInfluencersRepository,
  MongoInfluencer
} from '@repositories/IInfluencersRepositories'
import { omit } from 'lodash'
import { ObjectId, WithId } from 'mongodb'

export class UpdateInfluencerService {
  constructor(private readonly influencerRepository: IInfluencersRepository) {}
  async execute(
    _id: string,
    params: Partial<MongoInfluencer>
  ): Promise<MongoInfluencer | Error> {
    const objId = new ObjectId(_id)

    const existInfluencer = await this.influencerRepository.findInfluencer({
      _id: objId
    })

    if (!existInfluencer) {
      throw new Error('Influenciador não existe')
    }

    if (params.EmailInfluencer) {
      const usedEmail = await this.influencerRepository.findInfluencer({
        email: params.EmailInfluencer
      })

      if (usedEmail && usedEmail._id.toString() !== _id) {
        throw new Error('Email do influenciador está em uso')
      }
    }

    if (params.ChannelUsername) {
      const usedUsernameChannel =
        await this.influencerRepository.findInfluencer({
          ChannelUsername: params.ChannelUsername
        })

      if (usedUsernameChannel && usedUsernameChannel._id.toString() !== _id) {
        throw new Error('Username do canal está em uso')
      }
    }

    const influencer = await this.influencerRepository.updateInfluencer(
      objId,
      params
    )

    if (!influencer) {
      throw new Error('Influenciador não foi atualizado')
    }

    const influencerOmitedId = omit(influencer, '_id')

    return influencerOmitedId
  }
}
