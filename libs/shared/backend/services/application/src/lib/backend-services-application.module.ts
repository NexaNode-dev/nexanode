import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { BackendServicesDataAccessModule } from '@nexanode/backend-services-data-access';

@Module({
  imports: [BackendServicesDataAccessModule],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class BackendServicesApplicationModule {}
