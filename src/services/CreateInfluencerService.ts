import { GetPlatformsService } from '@services/GetPlatformsService'
import {
  IInfluencersRepository,
  MongoInfluencer
} from '@repositories/IInfluencersRepositories'
import { Influencer } from '@models/Influencer'

export class CreateInfluencerService {
  constructor(private influencerRepository: IInfluencersRepository) {}
  async execute(params: MongoInfluencer): Promise<Influencer | Error> {
    const existInfluencer = await this.influencerRepository.findInfluencer({
      EmailInfluencer: params.EmailInfluencer
    })

    if (existInfluencer) {
      throw new Error('Influenciador já existente')
    }

    const existUsernameChannel = await this.influencerRepository.findInfluencer(
      {
        ChannelUsername: params.ChannelUsername
      }
    )

    if (existUsernameChannel) {
      throw new Error('Username do canal está em uso')
    }

    const existPlataform = await new GetPlatformsService().execute({
      PlatformId: params.PlatformId
    })

    if (existPlataform.length === 0) {
      throw new Error('Plataforma informada não existe')
    }

    const influencer = await this.influencerRepository.createInfluencer(params)

    if (!influencer) {
      throw new Error('Influenciador não foi criado')
    }

    return influencer
  }
}
