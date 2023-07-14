/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import { DeleteUserService } from '@services/DeleteUserService'

export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  async handle(request: Request, response: Response) {
    const _id = request?.params?._id

    if (!_id) {
      throw new Error('User id is missing')
    }

    const result = await this.deleteUserService.execute(_id)

    return response.json({ success: true, data: result })
  }
}
