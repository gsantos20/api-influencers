/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express'
import { User } from '@models/User'
import { GetUsersService } from '@services/GetUsersService'

export class GetUsersController {
  constructor(private readonly getUsersService: GetUsersService) {}

  async handle(request: Request, response: Response) {
    const { id, username, email, firstName, lastName, createdAt, updatedAt } =
      request.query as Partial<User>

    const result = await this.getUsersService.execute({
      id,
      username,
      email,
      firstName,
      lastName,
      createdAt,
      updatedAt
    })

    return response.json({ success: true, data: result })
  }
}
