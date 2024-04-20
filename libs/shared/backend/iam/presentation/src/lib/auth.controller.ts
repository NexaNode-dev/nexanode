import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { IamService } from '@nexanode/backend-iam-application';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly iamService: IamService) {}

  @Post('login')
  async login(loginDto: LoginDto) {
    return this.iamService.login(loginDto);
  }

  @Post('register')
  async register(registerDto: RegisterDto) {
    return this.iamService.register(registerDto);
  }

  @Patch('activate/:id')
  async activate(@Param('id') userId: string, @Body() token: string) {
    return this.iamService.activate(userId, token);
  }
}
