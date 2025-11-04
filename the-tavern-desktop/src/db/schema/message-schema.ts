import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema"; 
import { chatrooms } from "./chatroom-schema"; 

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .references(() => users.id) // Reference the id column in the users table
    .notNull(),
  chatroomId: integer("chatroom_id")
    .references(() => chatrooms.id) 
    .notNull(),
  message: text("message").notNull(),
  datesendt: text("datesendt").notNull().$defaultFn(() => new Date().toISOString()), 
});

export type Message = typeof messages.$inferSelect;
