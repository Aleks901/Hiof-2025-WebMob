// src/db/schema/user-schema.ts

import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  password: text("password").notNull(),
  joinedAt: text("joined_at").notNull(),
  role: text("role").notNull(),
  token: text("token"),
});

export type User = typeof users.$inferSelect;