import { Global, Module, Logger } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import * as dotenv from 'dotenv'
import * as Joi from 'joi'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigEnum } from './enum/config.enum'

import { Logs } from './modules/logs/logs.entity'
import { LogsModule } from './modules/logs/logs.module'
import { Roles } from './modules/roles/roles.entity'

import { Profile } from './modules/user/entities/profile.entity'
import { User } from './modules/user/entities/user.entity'
import { UserModule } from './modules/user/user.module'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DB_TYPE: Joi.string().valid('mysql', 'postgres', 'mongodb'),
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.string().ip(),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(ConfigEnum.DB_TYPE),
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_PORT),
          username: configService.get(ConfigEnum.DB_USERNAME),
          password: configService.get(ConfigEnum.DB_PASSWORD),
          database: configService.get(ConfigEnum.DB_DATABASE),
          entities: [User, Profile, Roles, Logs],
          synchronize: configService.get(ConfigEnum.DB_SYNC),
          logging: ['error'],
        } as TypeOrmModuleOptions),
    }),
    UserModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger],
})
export class AppModule {}
