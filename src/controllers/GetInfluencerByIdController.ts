/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GetInfluencerByIdService } from '@services/GetInfluencerByIdService'
import { Request, Response } from 'express'

export class GetInfluencerByIdController {
  constructor(private getInfluencerByIdService: GetInfluencerByIdService) {}

  async handle(request: Request, response: Response) {
    const _id = request?.params?._id

    if (!_id) {
      throw new Error('Id do influenciador é obrigatório')
    }

    const result = await this.getInfluencerByIdService.execute(_id)

    return response.json({ success: true, data: result }).status(200)
  }
}
