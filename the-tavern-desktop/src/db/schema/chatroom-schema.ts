import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const chatrooms = sqliteTable("chatrooms", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imgref: text("imgref"), 
});

export type Chatroom = typeof chatrooms.$inferSelect;