import { IMedia } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';

export const mediaItemFactory = (options: Partial<IMedia> = {}): IMedia => {
  const media: IMedia = {
    id: faker.string.uuid(),
    name: faker.lorem.words(),
    originalName: faker.lorem.words(),
    type: faker.helpers.arrayElement([
      'image',
      'video',
      'document',
    ]) as IMedia['type'],
    storageType: faker.helpers.arrayElement([
      'local',
      'azure',
    ]) as IMedia['storageType'],
    metadata: {
      size: faker.number.int(),
      mimeType: faker.system.mimeType(),
      uploadDate: faker.date.recent(),
    },
    url: faker.internet.url(),
    userId: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  return { ...media, ...options };
};

export const mediaItemsFactory = (
  count = 3,
  options?: Partial<IMedia>[],
): IMedia[] => {
  return Array.from({ length: count }, (_, i) =>
    mediaItemFactory(options ? options[i] : undefined),
  );
};
