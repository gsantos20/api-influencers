/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@database/prisma'
import { IUsersRepository, PrismaUser } from '../IUsersRepositories'

class PrismaUsersRepository implements IUsersRepository {
  async getUsers(params: Partial<PrismaUser>) {
    const users = await prisma.user.findMany({
      where: { ...params }
    })

    return users
  }

  async createUser({
    username,
    email,
    password,
    firstName,
    lastName
  }: PrismaUser) {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        firstName,
        lastName
      }
    })

    return user
  }

  async findUser(params: any) {
    const user = await prisma.user.findUnique({
      where: { ...params }
    })

    return user
  }

  async findUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id: id }
    })

    return user
  }

  async deleteUser(id: number) {
    const user = await prisma.user.delete({
      where: { id: id }
    })

    return !!user
  }
}

export { PrismaUsersRepository }

