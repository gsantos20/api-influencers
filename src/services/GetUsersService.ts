import { User } from '../models/User'
import { IUsersRepository } from '@repositories/IUsersRepositories'

export class GetUsersService {
  constructor(private readonly userRepository: IUsersRepository) {}
  async execute(
    params: Partial<User>
  ): Promise<Omit<User, 'Password'>[] | Error> {
    const filter = Object.keys(params).reduce((obj, key) => {
      const value = params[key]

      if (/^-?\d+$/.test(value)) {
        obj[key] = { $eq: parseInt(value) }
      } else if (/^(true|false)$/i.test(value)) {
        obj[key] = { $e: value.toLowerCase() === 'true' ? true : false }
      } else {
        obj[key] = { $regex: value, $options: 'i' }
      }

      return obj
    }, {})

    const users = await this.userRepository.getUsers(filter)

    const result = users.map((user) => {
      const { Password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return result
  }
}
