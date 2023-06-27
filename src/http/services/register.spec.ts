import { describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'

// TESTE UNITÁRIO
describe('Register use case', async () => {
  it('Should be able to hash password', async () => {
    const registerService = new RegisterService({
      async findByEmail(email) {
        return null
      },
      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerService.execute({
      name: 'Reginaldo Jr',
      email: 'reginaldo@domain.br',
      password: 'senha123',
    })
    const isPasswordCorrectyHashed = await compare(
      'senha123',
      user.password_hash,
    )
    expect(isPasswordCorrectyHashed).toBe(true)
  })
})
