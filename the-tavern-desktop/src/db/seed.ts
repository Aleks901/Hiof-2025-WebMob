// src/db/seed.ts

import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { chatrooms, users } from "./schema";
import { env as WorkerEnv } from "cloudflare:workers";

// Remove ensureTables - let Drizzle migrations handle this

export const seedData = async (maybeEnv?: { DB: D1Database }) => {
  try {
    const D1 = (maybeEnv?.DB ?? WorkerEnv.DB) as D1Database;
    const db = drizzle(D1);
    
    const existing = await db.select().from(chatrooms).limit(1);
    if (existing.length > 0) {
      console.log("Seed successful, already seeded.")
      return { seeded: false, message: "Chatrooms already exist. Skipping." };
    }

    type ChatroomInsert = typeof chatrooms.$inferInsert;
    const chatData: ChatroomInsert[] = [
      { name: "The Tavern", 
        description: "The Tavern general chatroom", 
        imgref: null 
      },
      { name: "Call of Duty", 
        description: "Call of Duty chatroom", 
        imgref: null 
      },
    ];

    await db.insert(chatrooms).values(chatData);
    const allChatrooms = await db.select().from(chatrooms).all();

    type UserInsert = typeof users.$inferInsert;
    const userData: UserInsert[] = [
      {
        name: "testuser",
        password: "password123",
        joinedAt: new Date().toISOString(),
        role: "user",
        token: null,
      },
    ];

    await db.insert(users).values(userData);
    const allUsers = await db.select().from(users).all();
    console.log("Seed successful!")
    return { 
      seeded: true, 
      chatrooms: allChatrooms, 
      users: allUsers
    };
    
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};


export default defineScript(async ({ env }) => {
  try {
    console.log("Seeding going through definescript..")
    const result = await seedData(env);
    return Response.json({ success: true, result });
  } catch (error) {
    console.error("Seeding script failed:", error);
    return Response.json({ success: false, error: "Failed to seed database" }, { status: 500 });
  }
});
