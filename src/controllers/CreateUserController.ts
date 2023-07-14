/* eslint-disable @typescript-eslint/no-non-null-assertion */
import validator from 'validator'
import { Request, Response } from 'express'
import { CreateUserService } from '@services/CreateUserService'
import { MongoUser } from '@repositories/IUsersRepositories'

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle(request: Request, response: Response) {
    const requiredFields: Array<keyof MongoUser> = [
      'Username',
      'Email',
      'Password',
      'FirstName',
      'LastName'
    ]

    requiredFields.forEach((el: string) => {
      if (!request?.body[el as keyof MongoUser]?.length) {
        throw new Error(`Field ${el} is required`)
      }
    })

    const user: MongoUser = { ...request.body }

    if (user.Username.length < 3) {
      throw new Error('Username must be at least 3 characters')
    }

    const emailIsValid = validator.isEmail(user.Email)
    if (!emailIsValid) {
      throw new Error('E-mail is invalid')
    }

    const result = await this.createUserService.execute(user)

    return response.json(result)
  }
}
