import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

import * as requestIp from 'request-ip'
import { QueryFailedError } from 'typeorm'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()

    const reply = ctx.getResponse()
    const request = ctx.getRequest()

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const msg: string =
      exception instanceof QueryFailedError
        ? exception.name
        : null || 'Internal Server error'

    // 加入更多错误判断
    // if (exception instanceof QueryFailedError) {
    //   msg = exception.message

    //   const { errno } = exception.driverError

    //   switch (errno) {
    //     case 1062:
    //       msg = '唯一索引冲突'
    //       break
    //     default:
    //       break
    //   }
    // }

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      timestamp: new Date().toISOString(),
      ip: requestIp.getClientIp(request),
      exception: exception instanceof QueryFailedError ? exception.name : '',
      error: msg,
    }

    this.logger.error('[All Exception Filter]', responseBody)
    httpAdapter.reply(reply, responseBody, httpStatus)
  }
}
