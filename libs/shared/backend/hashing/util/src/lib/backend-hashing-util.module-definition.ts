import { ConfigurableModuleBuilder } from '@nestjs/common';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: HASHING_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<{
  algorithm: string;
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
