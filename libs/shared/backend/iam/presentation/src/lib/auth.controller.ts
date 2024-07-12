import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { IamService } from '@nexanode/backend-iam-application';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IPermission, IUser } from '@nexanode/domain-interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly iamService: IamService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ user: IUser; permissions: IPermission[] }> {
    return this.iamService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<IUser> {
    return this.iamService.register(registerDto);
  }

  @Patch('activate/:id')
  async activate(
    @Param('id') userId: string,
    @Body() token: string,
  ): Promise<boolean> {
    return this.iamService.activate(userId, token);
  }

  @Post('forgot')
  async forgotPassword(@Body() credential: string): Promise<boolean> {
    return this.iamService.forgotPassword(credential);
  }

  @Patch('reset')
  async resetPassword(
    @Body() token: string,
    @Body() password: string,
  ): Promise<boolean> {
    return this.iamService.resetPassword(token, password);
  }
}
