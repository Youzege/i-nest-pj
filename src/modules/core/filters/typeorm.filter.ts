import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { TypeORMError, QueryFailedError } from 'typeorm'

@Catch()
export class TypeormFilter implements ExceptionFilter {
  async catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()

    const reply = ctx.getResponse()

    let code = 500

    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno
    }
    reply.code(500).send({
      code,
      timestamp: new Date().toISOString(),
      message: exception.message,
    })
  }
}
