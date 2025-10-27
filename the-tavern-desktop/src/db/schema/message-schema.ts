import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema"; 
import { chatrooms } from "./chatroom-schema"; 

export const messages = sqliteTable("messages", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id")
    .references(() => users.id) // Reference the id column in the users table
    .notNull(),
  chatroomId: int("chatroom_id")
    .references(() => chatrooms.id) 
    .notNull(),
  message: text("message").notNull(),
  datesendt: text("datesendt").notNull(), 
});

export type Message = typeof messages.$inferSelect;
