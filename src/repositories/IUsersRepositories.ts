import { User } from '@prisma/client'

export type MongoUser = Omit<User, 'id'>
export type PrismaUser = Omit<User, 'id'>
export type CreatePrismaUser = Omit<PrismaUser, 'createdAt' | 'updatedAt'>

export interface IUsersRepository {
  getUsers(params: Partial<PrismaUser>): Promise<User[] | []>
  createUser(user: CreatePrismaUser): Promise<User | null>
  findUser(params: Partial<PrismaUser>): Promise<User | null>
  findUserById(id: number): Promise<User | null>
  deleteUser(id: number): Promise<boolean | null>
}
