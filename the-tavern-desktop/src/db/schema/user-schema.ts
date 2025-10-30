// src/db/schema/user-schema.ts

import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
import { Role } from "@packages/types/role"

export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  password: text("password").notNull(),
  joinedAt: text("joined_at").notNull().$defaultFn(() => new Date().toISOString()),
  role: text("role").notNull().$type<Role>().default("regular"),
  token: text("token"),
});

export type User = typeof users.$inferSelect;