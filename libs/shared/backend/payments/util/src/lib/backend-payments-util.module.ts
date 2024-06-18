import { Inject, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  PAYMENT_MODULE_OPTIONS,
} from './backend-payments-util.module.definition';
import { MolliePaymentsProvider } from './providers/mollie.payments.provider';
import { createMollieClient, MollieClient } from '@mollie/api-client';

@Module({})
export class BackendPaymentsUtilModule extends ConfigurableModuleClass {
  constructor(
    @Inject(PAYMENT_MODULE_OPTIONS) private options: string | symbol,
  ) {
    super();
  }

  static register(options: typeof OPTIONS_TYPE) {
    if (options.paymentProvider === 'mollie') {
      const mollieClient: MollieClient = createMollieClient({
        apiKey: process.env['MOLLIE_API_KEY'] || '',
      });
      return {
        ...super.register(options),
        providers: [
          {
            provide: PAYMENT_MODULE_OPTIONS,
            useValue: options,
          },
          {
            provide: PaymentsService,
            useFactory: () => new MolliePaymentsProvider(mollieClient),
          },
        ],
      };
    } else {
      throw new Error('Payment provider not supported');
    }
  }
}
