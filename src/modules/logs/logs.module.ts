import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston'
import * as winstom from 'winston'
import DaliyRotateFile from 'winston-daily-rotate-file'
import { Console } from 'winston/lib/winston/transports'

import { LogEnum } from '@/enum/config.enum'

const consoleTransPorts = new Console({
  level: 'info',
  format: winstom.format.combine(
    winstom.format.timestamp(),
    utilities.format.nestLike(),
  ),
})

const daliyTransPorts = (configService: ConfigService) => {
  return new DaliyRotateFile({
    level: configService.get(LogEnum.LOG_LEVEL),
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
  })
}

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          transports: [
            consoleTransPorts,
            configService.get(LogEnum.LOG_ON)
              ? daliyTransPorts(configService)
              : [],
          ],
        } as WinstonModuleOptions),
    }),
  ],
})
export class LogsModule {}
