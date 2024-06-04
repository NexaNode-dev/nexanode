import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { BackendServicesApplicationModule } from '@nexanode/backend-services-application';

@Module({
  imports: [BackendServicesApplicationModule],
  controllers: [ServicesController],
  providers: [],
  exports: [],
})
export class BackendServicesPresentationModule {}
