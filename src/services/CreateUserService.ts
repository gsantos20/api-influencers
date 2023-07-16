import { hash } from 'bcryptjs'
import { User } from '../models/User'
import { IUsersRepository, MongoUser } from '@repositories/IUsersRepositories'

export class CreateUserService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute({
    Email,
    Password,
    FirstName,
    LastName
  }: MongoUser): Promise<User | Error> {
    const existUser = await this.userRepository.findUser({ Username: Email })

    if (existUser) {
      throw new Error('Usuário não existente')
    }

    const passwordHash = await hash(Password, 8)

    const user = await this.userRepository.createUser({
      Username: Email,
      Email,
      Password: passwordHash,
      FirstName,
      LastName
    })

    if (!user) {
      throw new Error('Usuário não foi criado')
    }

    return user
  }
}
