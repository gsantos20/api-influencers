import { User } from '@models/User'
import { MongoClient } from '../../database/mongo'
import { IUsersRepository, MongoUser } from '../IUsersRepositories'
import { ObjectId } from 'mongodb'

class MongoUsersRepository implements IUsersRepository {
  async getUsers(params: Partial<MongoUser>) {
    const users = await MongoClient.db
      .collection<User>('users')
      .find<User>(params)
      .toArray()

    return users
  }

  async createUser({
    Username,
    Email,
    Password,
    FirstName,
    LastName
  }: MongoUser) {
    const { insertedId } = await MongoClient.db.collection('users').insertOne({
      Username,
      Email,
      Password,
      FirstName,
      LastName
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

  async deleteUser(_id: ObjectId) {
    const user = await MongoClient.db
      .collection<MongoUser>('users')
      .findOneAndDelete({ _id: _id })

    return !!user
  }
}

export { MongoUsersRepository }
