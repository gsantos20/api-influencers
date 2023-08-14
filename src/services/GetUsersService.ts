import { omit } from 'lodash'
import { IUsersRepository } from '@repositories/IUsersRepositories'
import { User } from '@prisma/client'
import moment from 'moment'

export class GetUsersService {
  constructor(private userRepository: IUsersRepository) {}
  async execute(
    params: Partial<User>
  ): Promise<Omit<User, 'password'>[] | Error> {
    const filter = Object.keys(params).reduce((obj, key) => {
      const value = params[key]

      if (value) {
        if (moment(value).isValid() && value.lenght >= 8) {
          obj[key] = moment.utc(value).toISOString()
        } else if (value instanceof String) {
          obj[key] = { contains: value }
        } else {
          obj[key] = value
        }
      }

      return obj
    }, {})

    const users = await this.userRepository.getUsers(filter)

    const result = users.map((user: User) => {
      const userWithoutPassword = omit(user, ['password'])
      return userWithoutPassword
    })

    return result
  }
}
