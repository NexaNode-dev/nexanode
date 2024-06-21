/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpParams } from '@angular/common/http';
import {
  IQueryParams,
  WhereCondition,
  OrderCondition,
} from '@nexanode/domain-interfaces';

export function convertToHttpParams<T>(
  queryParams: IQueryParams<T>,
): HttpParams {
  let httpParams = new HttpParams();

  if (queryParams.select) {
    httpParams = httpParams.set('select', queryParams.select.join(','));
  }

  if (queryParams.where) {
    for (const key in queryParams.where) {
      if (Object.prototype.hasOwnProperty.call(queryParams.where, key)) {
        const condition = queryParams.where[key as keyof WhereCondition<T>];
        if (typeof condition === 'object') {
          for (const op in condition) {
            if (Object.prototype.hasOwnProperty.call(condition, op)) {
              httpParams = httpParams.set(
                `where[${key}][${op}]`,
                (condition as any)[op],
              );
            }
          }
        } else {
          httpParams = httpParams.set(`where[${key}]`, condition as any);
        }
      }
    }
  }

  if (queryParams.relations) {
    httpParams = httpParams.set('relations', queryParams.relations.join(','));
  }

  if (queryParams.order) {
    for (const key in queryParams.order) {
      if (Object.prototype.hasOwnProperty.call(queryParams.order, key)) {
        const direction = queryParams.order[key as keyof OrderCondition<T>];
        if (typeof direction === 'object') {
          httpParams = httpParams.set(
            `order[${key}]`,
            JSON.stringify(direction),
          );
        } else {
          httpParams = httpParams.set(`order[${key}]`, direction as string);
        }
      }
    }
  }

  if (queryParams.withDeleted !== undefined) {
    httpParams = httpParams.set(
      'withDeleted',
      queryParams.withDeleted.toString(),
    );
  }

  if (queryParams.skip !== undefined) {
    httpParams = httpParams.set('skip', queryParams.skip.toString());
  }

  if (queryParams.take !== undefined) {
    httpParams = httpParams.set('take', queryParams.take.toString());
  }

  return httpParams;
}

export function convertToQueryString<T>(queryParams: IQueryParams<T>): string {
  const httpParams = convertToHttpParams(queryParams);
  return httpParams.toString();
}
