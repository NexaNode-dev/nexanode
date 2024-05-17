import { Inject, Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import {
  ConfigurableModuleClass,
  HASHING_MODULE_OPTIONS,
  OPTIONS_TYPE,
} from './backend-hashing-util.module-definition';

@Module({})
export class BackendHashingUtilModule extends ConfigurableModuleClass {
  constructor(
    @Inject(HASHING_MODULE_OPTIONS) private options: string | symbol,
  ) {
    super();
  }

  static register(options: typeof OPTIONS_TYPE) {
    switch (options.algorithm) {
      case 'bcrypt':
        return {
          ...super.register(options),
          providers: [
            {
              provide: HASHING_MODULE_OPTIONS,
              useValue: options,
            },
            {
              provide: HashingService,
              useClass: BcryptService,
            },
          ],
        };
      default:
        throw new Error('Unsupported hashing algorithm');
    }
  }
}
