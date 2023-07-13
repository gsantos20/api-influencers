import { User } from '@models/User'

export type MongoUser = Omit<User, "_id">;

export interface IUsersRepository {
  createUser(user: Omit<User, '_id'>): Promise<User | null>
  findUser(username: string): Promise<User | null>
}
