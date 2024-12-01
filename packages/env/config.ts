import { createEnv } from "@t3-oss/env-core";
import { createEnv as createNextEnv } from "@t3-oss/env-nextjs";

const asdf = createEnv({
  clientPrefix: "",
  server: {},
  client: {},
  runtimeEnv: {},
});
