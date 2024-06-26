import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { BackendMediaDataAccessModule } from '@nexanode/backend-media-data-access';

@Module({
  imports: [BackendMediaDataAccessModule],
  providers: [MediaService],
  exports: [MediaService],
})
export class BackendMediaApplicationModule {}
