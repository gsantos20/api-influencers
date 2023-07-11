import { hash } from 'bcryptjs'
import { User } from '../models/User'
import { IUsersRepository } from '@/repositories/IUsersRepositories'

export class CreateUserService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute({
    username,
    password,
    firstName,
    lastName,
    email
  }: Omit<User, 'id'>): Promise<Error | User> {
    const existUser = await this.userRepository.existsUser(username)

    if (existUser) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = await this.userRepository.createUser({
      username,
      password: passwordHash,
      firstName,
      lastName,
      email
    })

    return user
  }
}
