import {
  Repository,
  FindManyOptions,
  FindOptionsWhere,
  MoreThan,
  Equal,
  LessThan,
  Like,
} from 'typeorm';
import { IQueryParams } from '@nexanode/domain-interfaces';
import { Type } from '@nestjs/common';

export type OperatorMap = {
  gt: '>';
  lt: '<';
  like: 'like';
};

export function QueryParamsMixin<TBase extends Type>(entity: {
  new (): TBase;
}) {
  // Assuming entity is needed for repository operations or further type extraction
  return class {
    repository: Repository<TBase>;

    constructor(repository: Repository<TBase>) {
      this.repository = repository;
    }

    transformQueryParams(query: IQueryParams<TBase>): FindManyOptions<TBase> {
      const options: FindManyOptions<TBase> = {};
  
      // Select
      if (query.select) {
        options.select = query.select;
      }
  
      // Where
      if (query.where) {
        options.where = this.parseWhereCondition(query.where);
      }
  
      // Relations
      if (query.relations) {
        options.relations = query.relations.map((relation) => relation.toString());
      }
  
      // Order
      if (query.order) {
        options.order = this.parseOrderCondition(query.order);
      }
  
      // withDeleted
      if (query.withDeleted !== undefined) {
        options.withDeleted = query.withDeleted;
      }
  
      // Skip and Take
      if (query.skip !== undefined) {
        options.skip = query.skip;
      }
      if (query.take !== undefined) {
        options.take = query.take;
      }
  
      return options;
    }
  
    private parseWhereCondition(condition: IQueryParams<TBase>['where']): object {
      const whereObj: FindOptionsWhere<TBase> = {};
      for (const key in condition) {
        const value = condition[key];
        if (typeof value === 'object') {
          const operator = value?[Object.keys(value)[0]] as IQueryParams<TBase>['where'][key];
          whereObj[key] = { [OperatorMap[operator]]: value };
        } else {
          whereObj[key] = value;
        }
      }
      return whereObj;
    }
  
    parseOrderCondition(condition: IQueryParams<TBase>['order']): Record<string, 'ASC' | 'DESC'> {
      const orderObj: Record<string, 'ASC' | 'DESC'> = {};
      for (const key in condition) {
        orderObj[key]?  condition[key] : null;
      }
      return orderObj;
    }
  }
}
