import { User } from '../models/User'
import { IUsersRepository } from '@repositories/IUsersRepositories'

export class GetUsersService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute(
    params: Partial<User>
  ): Promise<Omit<User, 'Password'>[] | Error> {
    const filter = Object.keys(params).reduce((obj, key) => {
      obj[key] = { $regex: params[key], $options: 'i' }
      return obj
    }, {})

    console.log(filter)

    const users = await this.userRepository.getUsers(filter)

    const result = users.map((user) => {
      const { Password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return result
  }
}
