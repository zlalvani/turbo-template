import { Pool } from '@neondatabase/serverless';
import { config } from '@repo/env';
import { CamelCasePlugin, Kysely, PostgresDialect, sql } from 'kysely';
import { memo } from 'radashi';

import type { DB } from './../database/schema';
import type { UserId, UserModel } from './../models';
import { UserMapper } from './../models/mappers';
import type { Insert } from './types';

export const createDatabase = (kysely: Kysely<DB>) => {
  const dbFuncs = {
    users: {
      get: async (id: UserId) => {
        const res = await kysely
          .selectFrom('users')
          .selectAll()
          .where('users.id', '=', id)
          .executeTakeFirst();

        return res ? UserMapper.toModel(res) : null;
      },
      create: async (user: Insert<UserModel>) => {
        const res = await kysely
          .insertInto('users')
          .values(user)
          .returningAll()
          .executeTakeFirstOrThrow();

        return UserMapper.toModel(res);
      },
    },
  };

  const transaction = async <T>(fn: (db: typeof dbFuncs) => Promise<T>) => {
    try {
      return await kysely.transaction().execute(async (trx) => {
        await sql`SET CONSTRAINTS ALL DEFERRED`.execute(trx);
        return await fn(createDatabase(trx));
      });
    } catch (e) {
      // logger.error(e);
      throw e;
    }
  };

  return { ...dbFuncs, transaction };
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
export type KyselyInstance = ReturnType<typeof createKysely>;
