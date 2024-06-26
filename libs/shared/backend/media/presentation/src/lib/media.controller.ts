import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  Patch,
  Delete,
} from '@nestjs/common';
import { MediaService } from '@nexanode/backend-media-application';
import { QueryParamsDto } from '@nexanode/backend-query-params-util';
import { IMedia } from '@nexanode/domain-interfaces';
import {
  FileInterceptor,
  MulterFile,
} from '@webundsoehne/nest-fastify-file-upload';
import { CreateMediaDto } from './dtos/create-media.dto';
import { UpdateMediaDto } from './dtos/update-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  findAll(@Query() queryParams: QueryParamsDto<IMedia>) {
    return this.mediaService.getMedia(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.getMediaById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createMediaDto: CreateMediaDto,
    @UploadedFile('file') file: MulterFile,
  ) {
    return this.mediaService.createMedia(createMediaDto, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.updateMedia(id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.deleteMedia(id);
  }
}
