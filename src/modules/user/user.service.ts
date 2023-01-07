import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Logs } from '../logs/logs.entity'

import { GetUserDTO } from './dto/get-user.dto'

import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
  ) {}

  findAll(query: GetUserDTO) {
    const { limit, page, username, gender, role } = query
    const take = limit || 10
    const skip = ((page || 1) - 1) * take

    return this.userRepository.find({
      select: {
        id: true,
        username: true,
        profile: {
          gender: true,
        },
      },
      relations: {
        profile: true,
        roles: true,
      },
      where: {
        username,
        profile: {
          gender,
        },
        roles: {
          id: role,
        },
      },
      take,
      skip,
    })
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

  findLogsByGroup(id: number) {
    return this.logsRepository
      .createQueryBuilder('logs')
      .select('logs.result', 'result')
      .addSelect('COUNT("logs.result")', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('logs.result')
      .orderBy('count', 'DESC')
      .addOrderBy('result', 'DESC')
      .offset(0)
      .limit(3)
      .getRawMany()
  }
}
