/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import { DeleteInfluencerService } from '@services/DeleteInfluencerService'

export class DeleteInfluencerController {
  constructor(private deleteInfluencerService: DeleteInfluencerService) {}

  async handle(request: Request, response: Response) {
    const _id = request?.params?._id

    if (!_id) {
      throw new Error('Id do influenciador é obrigatório')
    }

    const result = await this.deleteInfluencerService.execute(_id)

    return response.json({ success: true, data: result })
  }
}
