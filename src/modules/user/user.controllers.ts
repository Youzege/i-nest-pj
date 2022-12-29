import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getUsers(): any {
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
}
