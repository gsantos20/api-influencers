/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import { UpdateInfluencerService } from '@services/UpdateInfluencerService';

export class UpdateInfluencerController {
  constructor(private updateInfluencerService: UpdateInfluencerService) {}

  async handle(request: Request, response: Response) {
    const _id = request?.params?._id;
    const body = request?.body;

    if (!body) {
      throw new Error("Fields for update is missing.");
    }

    if (!_id) {
      throw new Error("User id is missing");
    }

    const influencer = await this.updateInfluencerService.execute(_id, request.body)

    return response.json(influencer)
  }
}
