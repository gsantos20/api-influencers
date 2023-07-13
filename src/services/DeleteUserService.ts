
import { IUsersRepository } from '@repositories/IUsersRepositories'
import { ObjectId, WithId } from 'mongodb'

export class DeleteUserService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute(_id: string): Promise<object | Error> {

    const objId = new ObjectId(_id)
    const existsUser = await this.userRepository.findUser({ _id : objId })

    if (!existsUser) {
      throw new Error('User does not exists')
    }

    const user = await this.userRepository.deleteUser(objId)

    if (!user) {
      throw new Error('User not deleted')
    }

    return {
      message: 'User deleted with success',
    }
  }
}
