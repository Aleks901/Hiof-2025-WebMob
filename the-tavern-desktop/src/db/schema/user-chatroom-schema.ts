import { sqliteTable, int, primaryKey } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema"; 
import { chatrooms } from "./chatroom-schema"; 

export const userChatrooms = sqliteTable(
  "user_chatrooms",
  {
    userId: int("user_id")
      .references(() => users.id) 
      .notNull(),
    chatroomId: int("chatroom_id")
      .references(() => chatrooms.id) 
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.chatroomId] }),
    };
  }
);

export type UserChatroom = typeof userChatrooms.$inferSelect;