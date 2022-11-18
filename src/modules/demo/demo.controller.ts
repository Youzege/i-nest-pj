/*
 * @Author: Youzege
 * @Date: 2022-11-18 13:57:09
 * @LastEditors: Youzege
 * @LastEditTime: 2022-11-18 14:27:53
 */
import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { ConfigEnum } from '../../enum/config.enum'

import { DemoService } from './demo.service'

@Controller('demo')
export class DemoController {
  constructor(
    private readonly demoService: DemoService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getDemo() {
    return this.demoService.getMessage()
  }

  @Get('/config')
  getConfig() {
    console.log(this.configService.get(ConfigEnum.DB_HOST))
    console.log(this.configService.get(ConfigEnum.DB_PORT)) // 3306
    console.log(this.configService.get(ConfigEnum.DB_DATABASE))
  }
}
