type RelationKeys<T> = {
  [K in keyof T]: T[K] extends Array<never> | object ? K : never;
}[keyof T];

type AnyFunction = (...args: never[]) => never;

type ScalarKeys<T> = {
  [K in keyof T]: T[K] extends Array<never> | AnyFunction | object ? never : K;
}[keyof T];

type ConditionOperators = 'gt' | 'lt' | 'like'; // Extend as needed

type WhereCondition<T> = {
  [K in keyof T]?: T[K] | { [op in ConditionOperators]?: T[K] }; // Support direct value or operators
};

export interface IQueryParams<T> {
  select?: ScalarKeys<T>[];
  where?: WhereCondition<T>;
  relations?: RelationKeys<T>[];
  order?: 'ASC' | 'DESC';
  withDeleted?: boolean;
  skip?: number;
  take?: number;
}
