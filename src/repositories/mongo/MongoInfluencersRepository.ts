/* eslint-disable @typescript-eslint/no-explicit-any */

import { Influencer } from '@models/Influencer'
import { MongoClient } from '../../database/mongo'
import { IInfluencersRepository, MongoInfluencer } from '../IInfluencersRepositories'
import { ObjectId } from 'mongodb'

class MongoInfluencersRepository implements IInfluencersRepository {
  async getInfluencers(params?: any): Promise<Influencer[]> {
    const influencers = await MongoClient.db
      .collection<Influencer>('influencers')
      .find({ ...params })
      .toArray()

    return influencers
  }

  async findInfluencer(email: string) {
    const influencer = await MongoClient.db
    .collection<Influencer>('influencers')
    .findOne<Influencer>({
      email: email
    })


    return influencer
  }

  async findInfluencerById(_id: string) {
    const influencer = await MongoClient.db
    .collection<MongoInfluencer>('influencers')
    .findOne<Influencer>({
      _id: new ObjectId(_id)
    })


    return influencer
  }

  async createInfluencer(params: MongoInfluencer) {
    const { insertedId } = await MongoClient.db
      .collection('influencers')
      .insertOne(params)

    const influencer = await this.findInfluencerById(insertedId.toString())


    return influencer
  }

  async updateInfluencer(_id: string, body: MongoInfluencer) {

    const influencer = await MongoClient.db
      .collection<MongoInfluencer>('influencers')
      .findOneAndUpdate( { _id: new ObjectId(_id) }, {$set: body}, {returnDocument: "after"})

    return influencer.value
  }
}

export { MongoInfluencersRepository }
