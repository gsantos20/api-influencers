import { User } from '@/models/User'
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
      .findOne({ _id: insertedId })

    if (!user) {
      throw new Error('User not created')
    }

    return user
  }

  async existsUser(username: string): Promise<boolean> {
    const user = await MongoClient.db.collection('users').findOne({
      username: username
    })

    return !!user
  }
}

export { MongoUsersRepository }
