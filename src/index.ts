import AppDataSource from '../ormconfig'

import { User } from './modules/user/entities/user.entity'

AppDataSource.initialize().then(async () => {
  const res = await AppDataSource.manager.find(User)

  console.log(res)
})

export default {}
