import { Controller, Delete, Get, Logger, Patch, Post } from '@nestjs/common'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {
    this.logger.log('UserController Init')
  }

  @Get('all')
  getUsers(): any {
    this.logger.warn('获取所有用户')
    return this.userService.findAll()
  }

  @Get()
  getUser(username: string) {
    return this.userService.find(username)
  }

  @Post()
  addUser(): any {
    const user = {
      username: 'Youzege',
      password: '123456',
    }

    return this.userService.create(user)
  }

  @Patch()
  updateUser(): any {
    const user = {
      username: 'Youzege Up',
    }

    return this.userService.update(1, user)
  }

  @Delete()
  deleteOne(): any {
    return this.userService.delete(1)
  }

  @Get('profile')
  getProfile(): any {
    return this.userService.findProfile(2)
  }

  @Get('logs')
  getLogs(): any {
    return this.userService.findLogs(2)
  }

  @Get('logsByGroup')
  async getLogsGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2)

    return res.map((o) => ({
      result: o.result,
      count: o.count,
    }))
  }
}
