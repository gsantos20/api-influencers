import { User } from '@models/User'

export interface IUsersRepository {
  createUser(user: Omit<User, '_id'>): Promise<User | null>
  findUser(username: string): Promise<User | null>
}
