import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { BackendIamApplicationModule } from '@nexanode/backend-iam-application';

@Module({
  imports: [BackendIamApplicationModule],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class BackendIamPresentationModule {}
