import { IUsersRepository } from '@repositories/IUsersRepositories'
import { ObjectId } from 'mongodb'

export class DeleteUserService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute(_id: string): Promise<string | Error> {
    const objId = new ObjectId(_id)
    const existsUser = await this.userRepository.findUser({ _id: objId })

    if (!existsUser) {
      throw new Error('Usuário não existe')
    }

    const user = await this.userRepository.deleteUser(objId)

    if (!user) {
      throw new Error('Usuário não excluido')
    }

    return 'User deleted with success'
  }
}
