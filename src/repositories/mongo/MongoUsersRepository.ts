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
  }: Omit<User, '_id'>) {
    const { insertedId } = await MongoClient.db.collection('users').insertOne({
      username,
      password,
      firstName,
      lastName,
      email
    })




    const user = await MongoClient.db
      .collection<WithId<Document>>('users')
      .findOne<User>( { _id: insertedId } )


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
