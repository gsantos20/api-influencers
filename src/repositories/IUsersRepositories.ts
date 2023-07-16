import { User } from '@models/User'
import { ObjectId } from 'mongodb'

export type MongoUser = Omit<User, '_id'>

export interface IUsersRepository {
  getUsers(params: Partial<MongoUser>): Promise<User[] | []>
  createUser(user: MongoUser): Promise<User | null>
  findUser(params: any): Promise<User | null>
  deleteUser(_id: ObjectId): Promise<boolean | null>
}
