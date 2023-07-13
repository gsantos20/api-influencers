/* eslint-disable @typescript-eslint/no-explicit-any */

import { Influencer } from '@models/Influencer'
import { MongoClient } from '../../database/mongo'
import {
  IInfluencersRepository,
  MongoInfluencer
} from '../IInfluencersRepositories'
import { ObjectId } from 'mongodb'

class MongoInfluencersRepository implements IInfluencersRepository {
  async getInfluencers(params?: any): Promise<Influencer[]> {
    const influencers = await MongoClient.db
      .collection<Influencer>('influencers')
      .find({ ...params })
      .toArray()

    return influencers
  }

  async findInfluencer(params: any) {
    const influencer = await MongoClient.db
      .collection<Influencer>('influencers')
      .findOne<Influencer>(params)

    return influencer
  }

  async createInfluencer(params: MongoInfluencer) {
    const { insertedId } = await MongoClient.db
      .collection('influencers')
      .insertOne(params)

    const influencer = await this.findInfluencer({ _id: insertedId })

    return influencer
  }

  async updateInfluencer(_id: ObjectId, body: MongoInfluencer) {
    const influencer = await MongoClient.db
      .collection<MongoInfluencer>('influencers')
      .findOneAndUpdate(
        { _id: _id },
        { $set: body },
        { returnDocument: 'after' }
      )

    return influencer.value
  }
}

export { MongoInfluencersRepository }
