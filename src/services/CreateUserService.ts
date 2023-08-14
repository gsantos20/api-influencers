import { omit } from 'lodash'
import { hash } from 'bcryptjs'
import { IUsersRepository, PrismaUser } from '@repositories/IUsersRepositories'
import { User } from '@prisma/client'

export class CreateUserService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute({
    email,
    password,
    firstName,
    lastName
  }: PrismaUser): Promise<Omit<User, 'password'> | Error> {
    const existUser = await this.userRepository.findUser({ username: email })

    if (existUser) {
      throw new Error('Usuário já existente!')
    }

    const passwordHash = await hash(password, 8)

    const user = await this.userRepository.createUser({
      username: email,
      email,
      password: passwordHash,
      firstName,
      lastName
    })

    if (!user) {
      throw new Error('Usuário não foi criado')
    }

    const userWithoutPassword = omit(user, 'password')

    return userWithoutPassword
  }
}
