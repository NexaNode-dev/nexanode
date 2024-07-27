import {
  IQueryParams,
  ScalarKeys,
  RelationKeys,
  WhereCondition,
  OrderCondition,
  OrderDirection,
} from '@nexanode/domain-interfaces';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

class ConditionOperatorsDto {
  @IsOptional()
  @IsString()
  gt?: string;

  @IsOptional()
  @IsString()
  lt?: string;

  @IsOptional()
  @IsString()
  like?: string;
}

class WhereConditionDto<T> {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConditionOperatorsDto)import {
    IQueryParams,
    ScalarKeys,
    RelationKeys,
    WhereCondition,
    OrderCondition,
  } from '@nexanode/domain-interfaces';
  import {
    IsOptional,
    IsString,
    IsNumber,
    IsBoolean,
    ValidateNested,
    IsArray,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class ConditionOperatorsDto {
    @IsOptional()
    @IsString()
    gt?: string;
  
    @IsOptional()
    @IsString()
    lt?: string;
  
    @IsOptional()
    @IsString()
    like?: string;
  }
  
  class WhereConditionDto<T> {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ConditionOperatorsDto)
    [key: string]: any | ConditionOperatorsDto;
  }
  
  class OrderConditionDto<T> {
    @IsOptional()
    @IsString()
    [key: string]: 'ASC' | 'DESC' | OrderConditionDto<T>;
  }
  
  export class QueryParamsDto<T> implements IQueryParams<T> {
    @IsOptional()
    @IsString({ each: true })
    select?: ScalarKeys<T>[];
  
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => WhereConditionDto)
    where?: WhereConditionDto<T>;
  
    @IsOptional()
    @IsString({ each: true })
    relations?: RelationKeys<T>[];
  
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => OrderConditionDto)
    order?: OrderConditionDto<T>;
  
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
  
  [key: string]: any | ConditionOperatorsDto;
}

class OrderConditionDto<T> {
  @IsOptional()
  @IsString()
  [key: string]: OrderDirection | OrderConditionDto<T>;
}

export class QueryParamsDto<T> implements IQueryParams<T> {
  @IsOptional()
  @IsString({ each: true })
  select?: ScalarKeys<T>[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WhereConditionDto)
  where?: WhereCondition<T> | WhereCondition<T>[];

  @IsOptional()
  @IsString({ each: true })
  relations?: RelationKeys<T>[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OrderConditionDto)
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
