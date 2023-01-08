import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { useContainer } from 'class-validator'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { AppModule } from './app.module'

import { AllExceptionFilter } from './modules/core/filters/all-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {},
  )
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  // 前缀: 指定url前缀
  app.setGlobalPrefix('api')
  // 自定义约束-注入依赖
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const httpAdapter = app.get('HttpAdapterHost')
  const logger = new Logger()
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter, logger))

  await app.listen(5174, '0.0.0.0')

  console.log('server: http://localhost:5174/api')
}
bootstrap()
