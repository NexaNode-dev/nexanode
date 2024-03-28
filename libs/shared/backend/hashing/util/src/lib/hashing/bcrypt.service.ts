import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  async hash(value: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(value, salt);
  }
  compare(value: string | Buffer, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
