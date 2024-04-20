import { ILogin } from '@nexanode/domain-interfaces';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto implements ILogin {
  @IsNotEmpty()
  @IsString()
  credential!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
