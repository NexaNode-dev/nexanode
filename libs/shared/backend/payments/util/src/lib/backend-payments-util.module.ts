import { Inject, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  PAYMENT_MODULE_OPTIONS,
} from './backend-payments-util.module.definition';
import { MolliePaymentsProvider } from './providers/mollie.payments.provider';
import createMollieClient, {
  MollieClient,
  MollieOptions,
} from '@mollie/api-client';

@Module({})
export class BackendPaymentsUtilModule extends ConfigurableModuleClass {
  constructor(
    @Inject(PAYMENT_MODULE_OPTIONS) private options: string | symbol,
  ) {
    super();
  }

  static register(options: typeof OPTIONS_TYPE) {
    if (options.paymentProvider === 'mollie') {
      const apiKey = options.paymentApiKey;
      if (!apiKey) {
        throw new Error('Mollie API key is required');
      }
      const mollieClient: MollieClient = createMollieClient({
        apiKey,
      } as MollieOptions);
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
        exports: [PaymentsService],
      };
    } else {
      throw new Error('Payment provider not supported');
    }
  }
}
