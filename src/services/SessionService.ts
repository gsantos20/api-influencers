import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { IUsersRepository } from '@repositories/IUsersRepositories'
import { Login } from '@models/Login'

export class SessionService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute({ Email, Password }: Login) {
    const user = await this.userRepository.findUser({ Username: Email })

    if (!user) {
      throw new Error('Usuário não existe!')
    }

    const passwordMatch = await compare(Password, user.Password)

    if (!passwordMatch) {
      throw new Error('Usuário ou Senhas incorretas')
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user._id.toString()
    })

    return { token }
  }
}
