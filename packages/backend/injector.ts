import { type Bindings, edgeBindings } from '@repo/backend-edge/injector';
import { createKysely } from './database';
import { createHashService } from './services/hash'; // maybe it's the relative imports?

export const nodeBindings = {
  ...edgeBindings,
  createKysely,
  createHashService,
} as const satisfies Bindings;
