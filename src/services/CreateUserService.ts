import { hash } from 'bcryptjs'
import { User } from '../models/User'
import { IUsersRepository, MongoUser } from '@repositories/IUsersRepositories'

export class CreateUserService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute({
    Username,
    Email,
    Password,
    FirstName,
    LastName
  }: MongoUser): Promise<User | Error> {
    const existUser = await this.userRepository.findUser({ Username: Username })

    if (existUser) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(Password, 8)

    const user = await this.userRepository.createUser({
      Username,
      Email,
      Password: passwordHash,
      FirstName,
      LastName
    })

    if (!user) {
      throw new Error('User not created')
    }

    return user
  }
}
