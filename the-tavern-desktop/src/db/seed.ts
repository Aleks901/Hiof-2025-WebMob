// src/db/seed.ts

import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { users, chatrooms, userChatrooms, messages } from "./schema";

export default defineScript(async ({ env }) => {
  try {
    const db = drizzle(env.DB);
    await db.delete(users);
    await db.delete(chatrooms);
    await db.delete(userChatrooms);
    await db.delete(messages);

    // Insert a user
    await db.insert(users).values({
      name: "Test user",
      password: "password123", // Replace with hashed password in production
      joinedAt: new Date().toISOString(),
      role: "admin",
      token: null,
    });

    // Insert chatroom
    await db.insert(chatrooms).values({
      name: "General",
      description: "A general chatroom for everyone",
      imgref: null,
    });

    // Insert user-chatroom relationship
    await db.insert(userChatrooms).values({
      userId: 1,
      chatroomId: 1,
    });

    // Insert message
    await db.insert(messages).values({
      userId: 1,
      chatroomId: 1,
      message: "Hello, world!",
      datesendt: new Date().toISOString(),
    });

    // Verify the inserts
    const allUsers = await db.select().from(users).all();
    const allChatrooms = await db.select().from(chatrooms).all();
    const allUserChatrooms = await db.select().from(userChatrooms).all();
    const allMessages = await db.select().from(messages).all();

    console.log("🌱 Finished seeding");

    return Response.json({
      users: allUsers,
      chatrooms: allChatrooms,
      userChatrooms: allUserChatrooms,
      messages: allMessages,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({
      success: false,
      error: "Failed to seed database",
    });
  }
});
