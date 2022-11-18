import { Injectable } from '@nestjs/common'

/*
 * @Author: Youzege
 * @Date: 2022-11-18 13:57:18
 * @LastEditors: Youzege
 * @LastEditTime: 2022-11-18 13:59:23
 */
@Injectable()
export class DemoService {
  getMessage() {
    return 'demo service'
  }
}
