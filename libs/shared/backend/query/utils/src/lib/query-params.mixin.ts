import { Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { IQueryParams } from '@nexanode/domain-interfaces';
import { Type } from '@nestjs/common';

export function QueryParamsMixin<TBase extends Type>(entity: { new (): TBase }) {
  // Assuming entity is needed for repository operations or further type extraction
  return class {
    repository: Repository<TBase>;

    constructor(repository: Repository<TBase>) {
      this.repository = repository;
    }

    transformQueryParamsToFindOptions(queryParams: IQueryParams<TBase>): FindManyOptions<TBase> {
      const findOptions: FindManyOptions<TBase>= {};

      // Handle 'select'
      if (queryParams.select && queryParams.select.length) {
        findOptions.select = queryParams.select;
      }

      // Handle 'relations'
      if (queryParams.relations && queryParams.relations.length) {
        findOptions.relations = queryParams.relations.map((relation) => relation.toString());
      }

      // Handle 'where'
      if (queryParams.where) {
        findOptions.where = this.parseWhereConditions(queryParams.where);
      }

      // Handle ordering
      // if (queryParams.order) {
      //   findOptions.order = queryParams.order; // Simplification: Adjust based on your ordering structure
      // }

      // Handle pagination
      if (queryParams.skip !== undefined) {
        findOptions.skip = queryParams.skip;
      }
      if (queryParams.take !== undefined) {
        findOptions.take = queryParams.take;
      }

      // Handle soft deletes
      if (queryParams.withDeleted) {
        findOptions.withDeleted = queryParams.withDeleted;
      }

      return findOptions;
    }

    parseWhereConditions(where: IQueryParams<TBase>['where']): FindOptionsWhere<TBase> {
      // Implement parsing logic based on your application's needs
      // This could be complex, depending on the operators and conditions you support
      return where as FindOptionsWhere<TBase>;
    }
  };
}
