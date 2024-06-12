import {
  IQueryParams,
  ScalarKeys,
  RelationKeys,
  WhereCondition,
  OrderCondition,
} from '@nexanode/domain-interfaces';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class QueryParamsDto<T> implements IQueryParams<T> {
  @IsOptional()
  @IsString({ each: true })
  select?: ScalarKeys<T>[];

  @IsOptional()
  where?: WhereCondition<T>;

  @IsOptional()
  @IsString({ each: true })
  relations?: RelationKeys<T>[];

  @IsOptional()
  order?: OrderCondition<T>;

  @IsOptional()
  @IsBoolean()
  withDeleted?: boolean;

  @IsOptional()
  @IsNumber()
  skip?: number;

  @IsOptional()
  @IsNumber()
  take?: number;
}
