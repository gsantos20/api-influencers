import { User } from '@models/User'
import { MongoClient } from '../../database/mongo'
import { IUsersRepository } from '../IUsersRepositories'
import { Document, WithId } from 'mongodb'

class MongoUsersRepository implements IUsersRepository {
  async createUser({
    username,
    password,
    firstName,
    lastName,
    email
  }: Omit<User, 'id'>) {
    const { insertedId } = await MongoClient.db.collection('users').insertOne({
      username,
      password,
      firstName,
      lastName,
      email
    })

    const user = await MongoClient.db
      .collection<User>('users')
      .findOne({ ObjectId: insertedId })

    return user
  }

  async findUser(username: string) {
    const user = await MongoClient.db.collection<User>('users').findOne({
      username: username
    })


    return user
  }
}

export { MongoUsersRepository }
