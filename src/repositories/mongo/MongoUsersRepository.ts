import { User } from '@models/User'
import { MongoClient } from '../../database/mongo'
import { IUsersRepository } from '../IUsersRepositories'

class MongoUsersRepository implements IUsersRepository {
  async createUser({
    username,
    password,
    firstName,
    lastName,
    email
  }: Omit<User, 'id'>): Promise<User | Error> {
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

    if (!user) {
      throw new Error('User not created')
    }

    return user
  }

  async findUser(username: string): Promise<any> {
    const user = await MongoClient.db.collection<User>('users').findOne({
      username: username
    })

    user!._id = user!._id.toString()

    return user
  }
}

export { MongoUsersRepository }
