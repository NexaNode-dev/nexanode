import { ConfigurableModuleBuilder } from '@nestjs/common';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: PAYMENT_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<{
  paymentProvider: string;
}>()
  .setExtras<{ isGlobal?: boolean }>(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();
