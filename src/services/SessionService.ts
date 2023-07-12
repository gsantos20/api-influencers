import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { IUsersRepository } from '@repositories/IUsersRepositories'

type LoginRequest = {
  username: string
  password: string
}

export class SessionService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute({ username, password }: LoginRequest) {
    const user = await this.userRepository.findUser(username)

    if (!user) {
      return new Error('User does not exists!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return new Error('User or Password incorrect')
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user._id.toString()
    })

    return { token }
  }
}
