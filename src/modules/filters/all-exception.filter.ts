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

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()

    const reply = ctx.getResponse()
    const request = ctx.getRequest()

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      timestamp: new Date().toISOString(),
      ip: requestIp.getClientIp(request),
      exception: exception.name,
      error: exception.getResponse() || 'Interval Server Error',
    }

    this.logger.error('Youzege', responseBody)
    httpAdapter.reply(reply, responseBody, httpStatus)
  }
}
