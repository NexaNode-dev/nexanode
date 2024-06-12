export type RelationKeys<T> = {
  [K in keyof T]: T[K] extends Array<never> | object ? K : never;
}[keyof T];

export type AnyFunction = (...args: never[]) => never;

export type ScalarKeys<T> = {
  [K in keyof T]: T[K] extends Array<never> | AnyFunction | object ? never : K;
}[keyof T];

export type ConditionOperators = 'gt' | 'lt' | 'like'; // Extend as needed

export type WhereCondition<T> = {
  [K in keyof T]?: T[K] | { [op in ConditionOperators]?: T[K] }; // Support direct value or operators
};

export type OrderDirection = 'ASC' | 'DESC';

export type OrderCondition<T> = {
  [K in keyof T]?: 'ASC' | 'DESC' | OrderCondition<T[K]>;
};


export interface IQueryParams<T> {
  select?: ScalarKeys<T>[];
  where?: WhereCondition<T>;
  relations?: RelationKeys<T>[];
  order?: OrderCondition<T>;
  withDeleted?: boolean;
  skip?: number;
  take?: number;
}
