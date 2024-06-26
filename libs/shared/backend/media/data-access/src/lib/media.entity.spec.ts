import { Media } from './media.entity';
import { faker } from '@faker-js/faker';

describe('Media', () => {
  it('should be defined', () => {
    expect(new Media({})).toBeDefined();
  });
  it('should have the required properties', () => {
    const media = new Media({
      name: faker.lorem.words(),
      originalName: faker.image.url(),
      type: faker.helpers.arrayElement([
        'image',
        'video',
        'document',
      ]) as Media['type'],
      storageType: faker.helpers.arrayElement([
        'local',
        'azure',
      ]) as Media['storageType'],
      metadata: {
        size: faker.number.int(),
        mimeType: faker.system.mimeType(),
        uploadDate: faker.date.recent(),
      },
      url: faker.image.url(),
      userId: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
    expect(media.id).toBeDefined();
    expect(media.name).toBeDefined();
    expect(media.originalName).toBeDefined();
    expect(media.type).toBeDefined();
    expect(media.storageType).toBeDefined();
    expect(media.metadata).toBeDefined();
    expect(media.url).toBeDefined();
    expect(media.userId).toBeDefined();
  });
});
