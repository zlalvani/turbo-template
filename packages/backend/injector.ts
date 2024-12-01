import { Bindings, edgeBindings } from "@repo/backend-edge/injector";

import { createKysely } from "~/database/index.js";
import { createHashService } from "~/services/hash";

export const nodeBindings = {
  ...edgeBindings,
  createKysely,
  createHashService,
} as const satisfies Bindings;
