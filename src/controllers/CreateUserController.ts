/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import { User } from '../models/User'
import { CreateUserService } from '@/services/CreateUserService'
import validator from 'validator'

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}
  async handle(request: Request, response: Response) {
    const user: User = { ...request.body }

    const requiredFields: Array<keyof Omit<User, 'id'>> = [
      'username',
      'password',
      'firstName',
      'lastName',
      'email'
    ]

    requiredFields.forEach((el: string) => {
      if (!user[el as keyof Omit<User, 'id'>]?.length) {
        throw new Error(`Field ${el} is required`)
      }
    })

    const emailIsValid = validator.isEmail(request.body!.email)
    if (!emailIsValid) {
      throw new Error('E-mail is invalid')
    }

    const result = await this.createUserService.execute(request?.body)

    return response.json(result)
  }
}
