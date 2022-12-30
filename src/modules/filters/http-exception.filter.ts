import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common'
// import { FastifyReply, FastifyRequest } from 'fastify'

@Catch(HttpException)
export class HTTPExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()

    const reply = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception.getStatus()

    this.logger.error(exception.message, exception.stack)

    reply.code(status).send({
      code: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    })
  }
}
