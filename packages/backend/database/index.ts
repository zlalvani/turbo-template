import type { DB } from '@repo/backend-edge/database/schema';
import { config } from '@repo/env';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { memo } from 'radashi';

export const createKysely = memo(() => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: config.database.url,
      max: 10,
    }),
  });

  return new Kysely<DB>({
    dialect,
    plugins: [new CamelCasePlugin()],
  });
});
