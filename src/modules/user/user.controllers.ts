import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common'

import { TypeormFilter } from '../core/filters'

import { GetUserDTO } from './dto/get-user.dto'

import { UserService } from './user.service'

@Controller('user')
@UseFilters(new TypeormFilter())
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {
    this.logger.log('UserController Init', UserController.name)
  }

  @Get()
  getUsers(@Query() query: GetUserDTO): any {
    return this.userService.findAll(query)
  }

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.userService.findOne(id)
  }

  @Post()
  addUser(@Body() dto: any): any {
    return this.userService.create(dto)
  }

  @Patch(':id')
  updateUser(@Body() dto: any, @Param('id') id: number): any {
    return this.userService.update(id, dto)
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: number): any {
    return this.userService.delete(id)
  }

  @Get('profile')
  getProfile(@Query() query: any): any {
    const { id } = query
    return this.userService.findProfile(id)
  }
}
