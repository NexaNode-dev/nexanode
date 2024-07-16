import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Media } from './media.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MediaRepository extends Repository<Media> {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {
    super(Media, mediaRepository.manager, mediaRepository.queryRunner);
  }

  getMedia(options: FindManyOptions<Media> = {}): Promise<Media[]> {
    return this.mediaRepository.find(options);
  }

  async getMediaItem(options: FindOneOptions<Media>): Promise<Media> {
    const media = await this.mediaRepository.findOne(options);
    if (!media) {
      throw new NotFoundException(
        `Media with options ${JSON.stringify(options)} not found`,
      );
    }
    return media;
  }

  async createMedia(media: Partial<Media>): Promise<Media> {
    const newMedia = this.mediaRepository.create(media);
    return this.mediaRepository.save(newMedia);
  }

  async updateMedia(id: string, media: Partial<Media>): Promise<Media> {
    const updatedMedia = await this.mediaRepository.preload({
      id,
      ...media,
    });
    if (!updatedMedia) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }
    return this.mediaRepository.save(updatedMedia);
  }

  async deleteMedia(id: string): Promise<string> {
    const media = await this.getMediaItem({ where: { id } });
    await this.mediaRepository.remove(media);
    return id;
  }
}
