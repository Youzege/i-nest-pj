/*
 * @Author: Youzege
 * @Date: 2022-11-18 14:50:28
 * @LastEditors: Youzege
 * @LastEditTime: 2022-11-18 15:18:47
 */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../user/entities/user.entity'

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}
