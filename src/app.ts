import fastify from 'fastify'
import { AppRoutes } from './http/routers/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(AppRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Erro de validação', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // dataDog/NreRelic/Sentry
  }

  return reply.status(500).send({ message: 'Erro interno do servidor!' })
})
