import { createKysely } from "database/index.js";

import {
  EdgeBindings,
  bindings as edgeBindings,
} from "@repo/backend-edge/injector";

export const bindings = {
  ...edgeBindings,
  createKysely,
} as const satisfies EdgeBindings;
