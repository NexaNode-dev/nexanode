import { Injectable } from '@nestjs/common';
import { MediaRepository } from '@nexanode/backend-media-data-access';
import {
  QueryParamsDto,
  transformQueryParamsToFindOptions,
} from '@nexanode/backend-query-params-util';
import { IMedia } from '@nexanode/domain-interfaces';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { unlink } from 'fs/promises';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async getMedia(queryParams: QueryParamsDto<IMedia> = {}): Promise<IMedia[]> {
    const options = transformQueryParamsToFindOptions(queryParams);
    return this.mediaRepository.getMedia(options);
  }

  async getMediaItem(
    queryParams: QueryParamsDto<IMedia> = {},
  ): Promise<IMedia> {
    const options = transformQueryParamsToFindOptions(queryParams);
    return this.mediaRepository.getMediaItem(options);
  }

  async getMediaById(id: string): Promise<IMedia> {
    return this.mediaRepository.getMediaItem({ where: { id } });
  }

  async createMedia(media: Partial<IMedia>, file: MulterFile): Promise<IMedia> {
    const mediaItem: Partial<IMedia> = {
      originalName: file.filename,
      metadata: {
        mimeType: file.mimetype,
        size: file.size,
        uploadDate: new Date(),
      },
      url: file.path,
      storageType: media.storageType,
      userId: media.userId,
      name: media.name || file.filename,
    };
    return this.mediaRepository.createMedia(mediaItem);
  }

  async updateMedia(id: string, media: Partial<IMedia>): Promise<IMedia> {
    return this.mediaRepository.updateMedia(id, media);
  }

  async deleteMedia(id: string): Promise<string> {
    const filepath = (
      await this.mediaRepository.getMediaItem({ where: { id } })
    ).url;
    await unlink(filepath);
    return this.mediaRepository.deleteMedia(id);
  }
}
