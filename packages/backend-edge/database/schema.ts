import { Kyselify } from "drizzle-orm/kysely";
import { pgTable, text } from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
});

export type DB = {
  users: Kyselify<typeof usersTable>;
};
