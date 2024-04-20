import { Module } from '@nestjs/common';
import { IamService } from './iam.service';
import { BackendAuthUtilModule } from '@nexanode/backend-auth-util';

@Module({
  imports: [BackendAuthUtilModule],
  providers: [IamService],
  exports: [IamService],
})
export class BackendIamApplicationModule {}
