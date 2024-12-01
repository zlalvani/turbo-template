import { Pool } from "@neondatabase/serverless";
import { EdgeBindings } from "injector";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { memo } from "radashi";

export const createDatabase = (kysely: Kysely<DB>) => {
  return {};
};

export const createKysely = memo(() => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: config.database.url,
      // TODO: verify this is correct
      max: 1, // One connection per edge function
    }),
  });

  return new Kysely<DB>({
    dialect,
    plugins: [new CamelCasePlugin()],
  });
});

export type Database = ReturnType<typeof createDatabase>;
