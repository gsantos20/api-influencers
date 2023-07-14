/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express'
import { User } from '@models/User'
import { GetUsersService } from '@services/GetUsersService'
import _, { pick } from 'lodash'

export class GetUsersController {
  constructor(private readonly getUsersService: GetUsersService) {}

  async handle(request: Request, response: Response) {
    const queryParams = Object.keys(request.query).reduce((acc, key) => {
      acc[_.capitalize(key)] = request.query[key]
      return acc
    }, {})

    const params = pick(queryParams as Partial<User>, [
      'Username',
      'Email',
      'FirstName',
      'LastName'
    ])

    const influencers = await this.getUsersService.execute(params)

    return response.json(influencers).status(200)
  }
}
