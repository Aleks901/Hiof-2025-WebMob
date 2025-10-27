import { sqliteTable, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema"; 
import { chatrooms } from "./chatroom-schema"; 

export const userChatrooms = sqliteTable(
  "user_chatrooms",
  {
    userId: integer("user_id")
      .references(() => users.id) 
      .notNull(),
    chatroomId: integer("chatroom_id")
      .references(() => chatrooms.id) 
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.chatroomId] }),
  ]
);

export type UserChatroom = typeof userChatrooms.$inferSelect;