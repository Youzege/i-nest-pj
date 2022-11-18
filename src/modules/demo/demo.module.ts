/*
 * @Author: Youzege
 * @Date: 2022-11-18 13:56:12
 * @LastEditors: Youzege
 * @LastEditTime: 2022-11-18 14:04:59
 */

import { Module } from '@nestjs/common'

import { DemoController } from './demo.controller'
import { DemoService } from './demo.service'

@Module({ controllers: [DemoController], providers: [DemoService] })
export class DemoModule {}
