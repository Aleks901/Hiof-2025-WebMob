// src/db/schema/user-schema.ts

import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";


export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
});

export type User = typeof users.$inferSelect;