/*
 * @Author: Youzege
 * @Date: 2022-11-18 14:45:01
 * @LastEditors: Youzege
 * @LastEditTime: 2022-11-18 15:19:03
 */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Logs } from '@/modules/logs/logs.entity'
import { Roles } from '@/modules/roles/roles.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[]

  @ManyToMany(() => Roles, (role) => role.users)
  @JoinTable({ name: 'users_roles' })
  roles: Roles[]
}
