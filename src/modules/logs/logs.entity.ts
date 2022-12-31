import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../user/entities/user.entity'

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  path: string

  @Column()
  method: string

  @Column()
  data: string

  @Column()
  result: number

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn()
  user: User
}
