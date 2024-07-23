/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindManyOptions, FindOneOptions, FindOptionsOrder } from 'typeorm';
import { IQueryParams, WhereCondition } from '@nexanode/domain-interfaces';

export function transformQueryParamsToFindOptions<T>(
  queryParams: IQueryParams<T>,
): FindManyOptions<T> | FindOneOptions<T> {
  const findOptions: FindManyOptions<T> = {};

  if (queryParams.select) {
    findOptions.select = queryParams.select as (keyof T)[];
  }

  if (queryParams.where) {
    findOptions.where = transformWhereCondition(queryParams.where);
  }

  if (queryParams.relations) {
    findOptions.relations = queryParams.relations as string[];
  }

  if (queryParams.order) {
    findOptions.order = queryParams.order as FindOptionsOrder<T>;
  }

  if (queryParams.withDeleted !== undefined) {
    findOptions.withDeleted = queryParams.withDeleted;
  }

  if (queryParams.skip !== undefined) {
    findOptions.skip = queryParams.skip;
  }

  if (queryParams.take !== undefined) {
    findOptions.take = queryParams.take;
  }

  return findOptions;
}

function transformWhereCondition<T>(where: WhereCondition<T>[] | WhereCondition<T>): any {
  if (Array.isArray(where)) {
    return where.map((condition) => transformSingleWhereCondition(condition));
  } else {
    return transformSingleWhereCondition(where);
  }
}

function transformSingleWhereCondition<T>(where: WhereCondition<T>): any {
  const transformedWhere: any = {};

  for (const key in where) {
    if (Object.prototype.hasOwnProperty.call(where, key)) {
      const condition = where[key];
      if (typeof condition === 'object' && !Array.isArray(condition)) {
        transformedWhere[key] = {};
        for (const operator in condition) {
          if (Object.prototype.hasOwnProperty.call(condition, operator)) {
            transformedWhere[key][operator] = condition[operator];
          }
        }
      } else {
        transformedWhere[key] = condition;
      }
    }
  }

  return transformedWhere;
}
