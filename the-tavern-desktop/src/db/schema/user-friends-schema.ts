import { sqliteTable, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema"; 

export const userFriends = sqliteTable(
    "user_friends", 
    {
    user_id: integer("user_id").notNull().references(() => users.id).notNull(),
    friend_id: integer("friend_id").notNull().references(() => users.id).notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.user_id, table.friend_id] }),
    ]
);

export type UserFriend = typeof userFriends.$inferSelect;