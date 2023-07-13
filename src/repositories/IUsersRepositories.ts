import { User } from '@models/User'
import { ObjectId } from 'mongodb'

export type MongoUser = Omit<User, '_id'>

export interface IUsersRepository {
  createUser(user: Omit<User, '_id'>): Promise<User | null>
  findUser(params: any): Promise<User | null>
  deleteUser(id: ObjectId): Promise<boolean | null>
}
