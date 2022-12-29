import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Logs } from '../logs/logs.entity'

import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
  ) {}

  findAll() {
    return this.userRepository.find()
  }

  find(username: string) {
    return this.userRepository.find({ where: { username } })
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } })
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

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    })
  }

  async findLogs(id: number) {
    const user = await this.findOne(id)

    return this.logsRepository.find({
      where: {
        user,
      },
      relations: {
        user: true,
      },
    })
  }
}
