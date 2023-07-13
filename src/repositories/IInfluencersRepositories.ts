/* eslint-disable @typescript-eslint/no-explicit-any */
import { Influencer } from '@models/Influencer'
import { ModifyResult, ObjectId, WithId } from 'mongodb';

export type MongoInfluencer = Omit<Influencer, "_id">;

export interface IInfluencersRepository {
  getInfluencers(params?: any): Promise<Influencer[]>
  findInfluencer(params: any): Promise<Influencer | null>
  createInfluencer(Influencer: MongoInfluencer): Promise<Influencer | null>
  updateInfluencer(_id: ObjectId, body: MongoInfluencer): Promise<WithId<MongoInfluencer> | null>
}
