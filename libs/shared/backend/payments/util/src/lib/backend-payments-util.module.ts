import { Inject, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  PAYMENT_MODULE_OPTIONS,
} from './backend-payments-util.module.definition';
import { MolliePaymentsProvider } from './providers/mollie.payments.provider';

@Module({})
export class BackendPaymentsUtilModule extends ConfigurableModuleClass {
  constructor(
    @Inject(PAYMENT_MODULE_OPTIONS) private options: string | symbol,
  ) {
    super();
  }

  static register(options: typeof OPTIONS_TYPE) {
    if (options.paymentProvider === 'mollie') {
      return {
        ...super.register(options),
        providers: [
          {
            provide: PAYMENT_MODULE_OPTIONS,
            useValue: options,
          },
          {
            provide: PaymentsService,
            useClass: MolliePaymentsProvider,
          },
        ],
      };
    } else {
      throw new Error('Payment provider not supported');
    }
  }
}
