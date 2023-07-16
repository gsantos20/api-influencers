/* eslint-disable @typescript-eslint/no-explicit-any */
import { Influencer } from '@models/Influencer'
import { ObjectId, WithId } from 'mongodb'

export type MongoInfluencer = Omit<Influencer, '_id'>

export interface IInfluencersRepository {
  getInfluencers(params?: Partial<MongoInfluencer>): Promise<Influencer[]>
  findInfluencer(params: any): Promise<Influencer | null>
  createInfluencer(Influencer: MongoInfluencer): Promise<Influencer | null>
  updateInfluencer(
    _id: ObjectId,
    body: MongoInfluencer
  ): Promise<WithId<MongoInfluencer> | null>
  deleteInfluencer(_id: ObjectId): Promise<boolean | null>
}
