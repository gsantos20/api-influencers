import { User } from '@models/User'
import { MongoClient } from '../../database/mongo'
import { IUsersRepository, MongoUser } from '../IUsersRepositories'
import { ObjectId } from 'mongodb'

class MongoUsersRepository implements IUsersRepository {
  async createUser({
    username,
    password,
    firstName,
    lastName,
    email
  }: MongoUser) {
    const { insertedId } = await MongoClient.db.collection('users').insertOne({
      username,
      password,
      firstName,
      lastName,
      email
    })

    const user = await this.findUser({ _id: insertedId })

    return user
  }

  async findUser(params: any) {
    const user = await MongoClient.db
      .collection<MongoUser>('users')
      .findOne<User>(params)

    return user
  }

  async deleteUser(id: ObjectId) {
    const user = await MongoClient.db
      .collection<MongoUser>('users')
      .findOneAndDelete({ _id: id })

    return !!user
  }
}

export { MongoUsersRepository }
