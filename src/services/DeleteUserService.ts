import { IUsersRepository } from '@repositories/IUsersRepositories'

export class DeleteUserService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute(id: string): Promise<string | Error> {
    const existsUser = await this.userRepository.findUserById(parseInt(id))

    if (!existsUser) {
      throw new Error('Usuário não existe')
    }

    const user = await this.userRepository.deleteUser(parseInt(id))

    if (!user) {
      throw new Error('Usuário não excluido')
    }

    return 'User deleted with success'
  }
}
