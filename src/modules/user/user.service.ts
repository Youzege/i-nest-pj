/*
 * @Author: Youzege
 * @Date: 2022-11-18 14:42:25
 * @LastEditors: Youzege
 * @LastEditTime: 2022-12-28 14:36:32
 */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find()
  }

  find(username: string) {
    return this.userRepository.find({ where: { username } })
  }

  create(user: Partial<User>) {
    const userTmp = this.userRepository.create(user)

    return this.userRepository.save(userTmp)
  }

  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user)
  }

  delete(id: number) {
    return this.userRepository.delete(id)
  }
}
