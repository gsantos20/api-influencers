import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { IUsersRepository } from '@repositories/IUsersRepositories'
import { Login } from '@models/Login'

export class SessionService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute({ username, password }: Login) {
    const user = await this.userRepository.findUser(username)

    if (!user) {
      return new Error('User does not exists!')
    }

    const passwordMatch = await compare(password, user.Password)

    if (!passwordMatch) {
      return new Error('User or Password incorrect')
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user._id.toString()
    })

    return { token }
  }
}
