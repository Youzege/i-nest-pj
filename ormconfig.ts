import * as fs from 'fs'

import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import * as dotEnv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

import { ConfigEnum } from './src/enum/config.enum'

/**
 * 通过环境变量来更新环境配置
 * @param env
 * @returns
 */
function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotEnv.parse(fs.readFileSync(env))
  }

  return {}
}

/**
 * 构建链接配置
 * @returns
 */
function buildConnectionOption() {
  const defaultConfig = getEnv('.env')
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`)

  const config = { ...defaultConfig, ...envConfig }

  const entitiesDir =
    process.env.NODE_ENV === 'test'
      ? [`${__dirname}/**/*.entity.ts`]
      : [`${__dirname}/**/*.entity{.js,.ts}`]

  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: entitiesDir,
    synchronize: true,
    logging: false,
  } as TypeOrmModuleOptions
}

export const connectionParams = buildConnectionOption()

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions)
