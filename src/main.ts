import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { useContainer } from 'class-validator'

import { utilities, WinstonModule } from 'nest-winston'
import { createLogger } from 'winston'
import * as winstom from 'winston'
import 'winston-daily-rotate-file'

import { AppModule } from './app.module'
import { HTTPExceptionFilter } from './modules/filters/http-exception.filter'

async function bootstrap() {
  const instance = createLogger({
    transports: [
      new winstom.transports.Console({
        format: winstom.format.combine(
          winstom.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      new winstom.transports.DailyRotateFile({
        level: 'warn',
        dirname: 'logs',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winstom.format.combine(
          winstom.format.timestamp(),
          winstom.format.simple(),
        ),
      }),
      new winstom.transports.DailyRotateFile({
        level: 'info',
        dirname: 'logs',
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winstom.format.combine(
          winstom.format.timestamp(),
          winstom.format.simple(),
        ),
      }),
    ],
  })

  const logger = WinstonModule.createLogger({
    instance,
  })

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger,
    },
  )
  // 前缀: 指定url前缀
  app.setGlobalPrefix('api')
  // 自定义约束-注入依赖
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.useGlobalFilters(new HTTPExceptionFilter(logger))
  await app.listen(5174, '0.0.0.0')

  console.log('server: http://localhost:5174/api')
}
bootstrap()
