import { IMedia, IMediaStorageType } from '@nexanode/domain-interfaces';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMediaDto
  implements Pick<IMedia, 'name' | 'userId' | 'storageType'>
{
  @IsOptional()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  storageType!: IMediaStorageType;
}
