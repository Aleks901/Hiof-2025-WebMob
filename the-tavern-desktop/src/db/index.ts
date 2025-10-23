// src/db/index.ts

import { drizzle } from "drizzle-orm/better-sqlite3"; // Import drizzle for better-sqlite3
import sqlite from "better-sqlite3";

// Import all schemaspn
import { users } from "./schema/user-schema";
import { chatrooms } from "./schema/chatroom-schema";
import { userChatrooms } from "./schema/user-chatroom-schema";
import { messages } from "./schema/message-schema";

// Initialize SQLite database connection
const sqliteInstance = sqlite("database.db"); // Replace "database.db" with your database file path
sqliteInstance.pragma("foreign_keys = ON"); // Enable foreign key constraints

// Create Drizzle ORM instance
export const db = drizzle(sqliteInstance);

// Export schemas for use in other parts of the application
export { users, chatrooms, userChatrooms, messages };