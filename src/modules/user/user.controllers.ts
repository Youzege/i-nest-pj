/*
 * @Author: Youzege
 * @Date: 2022-11-18 14:41:47
 * @LastEditors: Youzege
 * @LastEditTime: 2022-11-18 14:44:21
 */
import { Controller, Get } from '@nestjs/common'

import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  find() {
    return this.userService.find()
  }
}
