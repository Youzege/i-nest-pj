/*
 * @Author: Youzege
 * @Date: 2022-11-18 14:48:50
 * @LastEditors: Youzege
 * @LastEditTime: 2022-11-18 14:57:35
 */
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from './user.entity'

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  gender: number

  @Column()
  photo: string

  @Column()
  address: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
