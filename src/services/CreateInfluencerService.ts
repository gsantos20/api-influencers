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
      throw new Error('Influencer already exists')
    }

    const existPlataform = await new GetPlatformsService().execute({
      PlatformId: params.PlatformId
    })

    if (existPlataform.length === 0) {
      throw new Error('Plataform does not exists')
    }

    const influencer = await this.influencerRepository.createInfluencer(params)

    if (!influencer) {
      throw new Error('Influencer not created')
    }

    return influencer
  }
}
