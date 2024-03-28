import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';
import * as bcrypt from 'bcrypt';

describe('BcryptService', () => {
  let service: BcryptService;

  const genSalt = jest.fn().mockResolvedValue('salt');
  (bcrypt.genSalt as jest.Mock) = genSalt;
  const hash = jest.fn().mockResolvedValue('hash');
  (bcrypt.hash as jest.Mock) = hash;
  const compare = jest.fn().mockResolvedValue(true);
  (bcrypt.compare as jest.Mock) = compare;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return a hash', async () => {
    const result = await service.hash('value');
    expect(result).toBe('hash');
    expect(genSalt).toHaveBeenCalledTimes(1);
  });
  it('should compare a value with a hash', async () => {
    const result = await service.compare('value', 'hash');
    expect(result).toBe(true);
  });
  it('should return false if the hash is invalid', async () => {
    compare.mockResolvedValue(false);
    const result = await service.compare('value', 'hash');
    expect(result).toBe(false);
  });
});
