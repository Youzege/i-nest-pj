import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston'
import * as winstom from 'winston'
import DaliyRotateFile from 'winston-daily-rotate-file'
import { Console } from 'winston/lib/winston/transports'

import { LogEnum } from '@/enum/config.enum'

function createDayliRotateTransport(level: string, fileName: string) {
  return new DaliyRotateFile({
    level,
    dirname: 'logs',
    filename: `${fileName}-%DATE%.log`,
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

const consoleTransPorts = new Console({
  level: 'info',
  format: winstom.format.combine(
    winstom.format.timestamp(),
    utilities.format.nestLike(),
  ),
})

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          transports: [
            consoleTransPorts,
            ...(configService.get(LogEnum.LOG_ON)
              ? [
                  createDayliRotateTransport('info', 'application'),
                  createDayliRotateTransport('warn', 'error'),
                ]
              : []),
          ],
        } as WinstonModuleOptions),
    }),
  ],
})
export class LogsModule {}
