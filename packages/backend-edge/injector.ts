import { createDatabase, createKysely } from './database/index';
import { createHashService } from './services/hash';
import { createIdService } from './services/id';

export const edgeBindings = {
  createDatabase,
  createKysely,
  createHashService,
  createIdService,
} as const;

export type Bindings = typeof edgeBindings;

export const injectDatabase = (bindings: Bindings = edgeBindings) => {
  return bindings.createDatabase(bindings.createKysely());
};

export const injectHashService = (bindings: Bindings = edgeBindings) => {
  return bindings.createHashService();
};

export const injectIdService = (bindings: Bindings = edgeBindings) => {
  return bindings.createIdService(injectHashService(bindings));
};
