/* eslint-disable @typescript-eslint/no-explicit-any */
import { Influencer } from '@models/Influencer'
import { ModifyResult, WithId } from 'mongodb';

export type MongoInfluencer = Omit<Influencer, "_id">;

export interface IInfluencersRepository {
  getInfluencers(params?: any): Promise<Influencer[]>
  findInfluencer(email: string): Promise<Influencer | null>
  findInfluencerById(_id: string): Promise<Influencer | null>
  createInfluencer(Influencer: MongoInfluencer): Promise<Influencer | null>
  updateInfluencer(_id: string, body: MongoInfluencer): Promise<WithId<MongoInfluencer> | null>
}
