import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { BackendServicesDataAccessModule } from '@nexanode/backend-services-data-access';
import { BackendCategoriesDataAccessModule } from '@nexanode/backend-categories-data-access';

@Module({
  imports: [
    BackendServicesDataAccessModule,
    BackendCategoriesDataAccessModule.register({ prefix: 'service' }),
  ],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class BackendServicesApplicationModule {}
