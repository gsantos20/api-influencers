import { IInfluencersRepository } from '@repositories/IInfluencersRepositories'
import { ObjectId } from 'mongodb'

export class DeleteInfluencerService {
  constructor(private readonly influencerRepository: IInfluencersRepository) {}
  async execute(_id: string): Promise<string | Error> {
    const objId = new ObjectId(_id)
    const existsInfluencer = await this.influencerRepository.findInfluencer({
      _id: objId
    })

    if (!existsInfluencer) {
      throw new Error('Influenciador não existe')
    }

    const influencer = await this.influencerRepository.deleteInfluencer(objId)

    if (!influencer) {
      throw new Error('Influenciador não excluido')
    }

    return 'Influenciador deletado com sucesso'
  }
}
