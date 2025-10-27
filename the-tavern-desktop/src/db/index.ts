// src/db/index.ts

import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import * as schema from "./schema";
import { users } from "./schema/user-schema";
import { chatrooms } from "./schema/chatroom-schema";
import { userChatrooms } from "./schema/user-chatroom-schema";
import { messages } from "./schema/message-schema";

export const db = drizzle(env.DB, { schema });

export const getDb = (D1: D1Database) => drizzle(D1, { schema });

export type DB = DrizzleD1Database<typeof schema>;

export { users, chatrooms, userChatrooms, messages };