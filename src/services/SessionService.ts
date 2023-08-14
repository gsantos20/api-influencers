import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { IUsersRepository } from '@repositories/IUsersRepositories'
import { Login } from '@models/Login'

export class SessionService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute({ email, password }: Login) {
    const user = await this.userRepository.findUser({ email: email })

    if (!user) {
      throw new Error('Usuário não existe!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Usuário ou Senha incorretas!')
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id.toString()
    })

    return { token }
  }
}
