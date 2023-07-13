import { Request, Response } from 'express'
import { pick } from 'lodash'
import { Platform } from '@models/Platform'
import { GetContentCategoriesService } from '@services/GetContentCategoriesService'

export class GetContentCategoriesController {
  constructor(
    private getContentCategoriesService: GetContentCategoriesService
  ) {}
  async handle(request: Request, response: Response) {
    const params = pick(request.query as Partial<Platform>, [
      'CategoryId',
      'CategoryDs',
      'Active'
    ])

    const platforms = await this.getContentCategoriesService.execute(params)

    return response.json(platforms).status(200)
  }
}
