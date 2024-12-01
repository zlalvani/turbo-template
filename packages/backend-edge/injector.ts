import { createDatabase, createKysely } from "database/index";

export const bindings = {
  createDatabase,
  createKysely,
} as const;

export type EdgeBindings = typeof bindings;

export const injectDatabase = (edgeBindings: EdgeBindings = bindings) => {
  return edgeBindings.createDatabase(edgeBindings.createKysely());
};
