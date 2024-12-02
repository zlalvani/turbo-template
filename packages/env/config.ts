import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  client: {},
  server: {
    // biome-ignore lint/style/useNamingConvention: env vars are uppercase
    DATABASE_URL: z.string().min(1).url(),
  },
  runtimeEnv: process.env as unknown as Record<string, string>,
});

export const config = {
  database: {
    url: env.DATABASE_URL,
  },
} as const;
