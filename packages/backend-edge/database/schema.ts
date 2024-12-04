import type { Kyselify } from 'drizzle-orm/kysely';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const usersTable = pgTable('users', {
  id: text().primaryKey(),
  email: text().unique().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type DB = {
  users: Kyselify<typeof usersTable>;
};
