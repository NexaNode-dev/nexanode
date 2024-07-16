import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { BackendMediaApplicationModule } from '@nexanode/backend-media-application';
import { MulterModule } from '@webundsoehne/nest-fastify-file-upload';

@Module({
  imports: [
    BackendMediaApplicationModule,
    MulterModule.register({
      dest: process.env['MEDIA_UPLOAD_PATH'] || '/tmp',
    }),
  ],
  controllers: [MediaController],
  providers: [],
  exports: [],
})
export class BackendMediaPresentationModule {}
