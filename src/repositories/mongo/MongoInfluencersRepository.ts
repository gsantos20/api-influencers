/* eslint-disable @typescript-eslint/no-explicit-any */

import { Influencer } from '../../models/Influencer'
import { MongoClient } from '../../database/mongo'
import { IInfluencersRepository } from '../IInfluencersRepositories'

class MongoInfluencersRepository implements IInfluencersRepository {
  async getInfluencers(params?: any): Promise<Influencer[]> {
    const influencers = await MongoClient.db
      .collection<Influencer>('influencers')
      .find({ ...params })
      .toArray()

    return influencers
  }

  async createInfluencer({
    firstName,
    lastName,
    email
  }: Influencer): Promise<Influencer | Error> {
    const { insertedId } = await MongoClient.db
      .collection('influencers')
      .insertOne({
        firstName,
        lastName,
        email
      })

    const influencer = await MongoClient.db
      .collection<Influencer>('influencers')
      .findOne({ _id: insertedId })

    if (!influencer) {
      throw new Error('Influencer not created')
    }

    return influencer
  }
}

export { MongoInfluencersRepository }
