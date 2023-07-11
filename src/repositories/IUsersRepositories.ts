import { User } from '../models/User'

export interface IUsersRepository {
  createUser(user: Omit<User, 'id'>): Promise<User | Error>
  existsUser(username: string): Promise<boolean>
}
