/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UpdateInfluencerService } from '@services/UpdateInfluencerService'
import { Request, Response } from 'express'

export class UpdateInfluencerController {
  constructor(private updateInfluencerService: UpdateInfluencerService) {}

  async handle(request: Request, response: Response) {
    const _id = request?.params?._id
    const body = request?.body

    if (!body) {
      throw new Error('Não existe campos para atualização')
    }

    if (!_id) {
      throw new Error('Id do usuário é obrigatório')
    }

    const result = await this.updateInfluencerService.execute(_id, request.body)

    return response.json({ success: true, data: result }).status(201)
  }
}
