/* eslint-disable @typescript-eslint/no-non-null-assertion */
import validator from 'validator'
import { Request, Response } from 'express'
import { CreateUserService } from '@services/CreateUserService'
import { MongoUser, PrismaUser } from '@repositories/IUsersRepositories'

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle(request: Request, response: Response) {
    const requiredFields: Array<keyof PrismaUser> = [
      'email',
      'password',
      'firstName',
      'lastName'
    ]

    requiredFields.forEach((el: string) => {
      if (!request?.body[el as keyof MongoUser]?.length) {
        throw new Error(`Campo ${el} é obrigatório`)
      }
    })

    const user: PrismaUser = { ...request.body }

    const emailIsValid = validator.isEmail(user.email)
    if (!emailIsValid) {
      throw new Error('E-mail é invalido')
    }

    const result = await this.createUserService.execute(user)

    return response.json({ success: true, data: result })
  }
}
