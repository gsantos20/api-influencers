/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import { DeleteUserService } from '@services/DeleteUserService'

export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params

    if (!id) {
      throw new Error('Id do usuário é obrigatório')
    }

    const result = await this.deleteUserService.execute(id)

    return response.json({ success: true, data: result })
  }
}
