import { UserAlreadyExistsError } from '@/Errors/user-already-exists'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'

interface registerServiceReq {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseReponse {
  user: User
}
// SOLID => D Dependency Inversion Principle

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: registerServiceReq): Promise<RegisterUseCaseReponse> {
    const password_hash = await hash(password, 3)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return {
      user,
    }
  }
}
