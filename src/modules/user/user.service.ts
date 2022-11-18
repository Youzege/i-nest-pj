/*
 * @Author: Youzege
 * @Date: 2022-11-18 14:42:25
 * @LastEditors: Youzege
 * @LastEditTime: 2022-11-18 14:43:58
 */
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  find() {
    return 'one'
  }
}
