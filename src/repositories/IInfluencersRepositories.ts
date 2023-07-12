/* eslint-disable @typescript-eslint/no-explicit-any */

import { Influencer } from '../models/Influencer'

export interface IInfluencersRepository {
  getInfluencers(params?: any): Promise<Influencer[]>
  createInfluencer(Influencer: Influencer): Promise<Influencer | Error>
}
