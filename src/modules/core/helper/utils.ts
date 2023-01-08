import { SelectQueryBuilder } from 'typeorm'

export const condition = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  option: Record<string, unknown>,
) => {
  Object.keys(option).forEach((key) => {
    if (option[key]) {
      queryBuilder.andWhere(`${key} = :${key}`, { [key]: option[key] })
    }
  })
  return queryBuilder
}
