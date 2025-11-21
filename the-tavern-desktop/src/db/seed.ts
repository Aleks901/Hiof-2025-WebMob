// src/db/seed.ts

import {chatrooms, users, messages, userChatrooms, userFriends } from './schema';
import { defineScript } from "rwsdk/worker";
import { getDb, setupDb } from ".";
import { hashPassword } from "@/lib/password";

export default defineScript(async ({ env }) => {
  try {
    console.log("Starting seeding process..")
    await setupDb(env.DB);
    const db = await getDb();
    console.log("Attempting to reset tables..")
    try { await db.delete(userChatrooms); } catch {console.log("The userChatrooms table contained no data, no reset necessary. Moving on..", userChatrooms)}
    try { await db.delete(userFriends); } catch {console.log("The userFriends table contained no data, no reset necessary. Moving on..")}
    try { await db.delete(messages); } catch {console.log("The messages table contained no data, no reset necessary. Moving on..")}
    try { await db.delete(chatrooms); } catch {console.log("The chatrooms table contained no data, no reset necessary. Moving on..")}
    try { await db.delete(users); } catch {console.log("The users table contained no data, no reset necessary. Moving on..")}
    console.log("Successfully reset existing tables..")

    const [user] = await db
      .insert(users)
      .values({
        name: "Aleks",
        password: await hashPassword("password123"),
        joinedAt: new Date().toISOString(),
        role: "regular",
      })
      .returning();

    const [user2] = await db
      .insert(users)
      .values({
        name: "Bastian",
        password: await hashPassword("password123"),
        joinedAt: new Date().toISOString(), 
        role: "regular",
      })
      .returning();

    const [user3] = await db
      .insert(users)
      .values({
        name: "Simen",
        password: await hashPassword("password123"),
        joinedAt: new Date().toISOString(), 
        role: "regular",
      })
      .returning();

    const [user4] = await db
      .insert(users)
      .values({
        name: "Lukas",
        password: await hashPassword("password123"),
        joinedAt: new Date().toISOString(),
        role: "regular",
      })
      .returning();

    const [user5] = await db
      .insert(users)
      .values({
        name: "Studass",
        password: await hashPassword("password123"),
        joinedAt: new Date().toISOString(),
        role: "regular",
      })
      .returning();

      console.log("Successfully inserted users..")

      const [chatroom] = await db
        .insert(chatrooms)
        .values({
          name: "The Tavern Testroom",
          description: "Test Chatroom for test purposes..",
          imgref: "/assets/tavern.jpg"
        })
      .returning();

      const [chatroom2] = await db
        .insert(chatrooms)
        .values({
          name: "Call of Duty",
          description: "Test Chatroom for 1337 gaming purposes..",
          imgref: "/assets/mw2.png"
        })
      .returning();

      await db
        .insert(userChatrooms)
        .values([
          { userId: user.id, chatroomId: chatroom.id },
          { userId: user2.id, chatroomId: chatroom.id },
          { userId: user3.id, chatroomId: chatroom.id },
          { userId: user4.id, chatroomId: chatroom.id },
          { userId: user5.id, chatroomId: chatroom.id },
          { userId: user.id, chatroomId: chatroom2.id },
          { userId: user2.id, chatroomId: chatroom2.id },
        ]);

      const [message1] = await db
        .insert(messages)
        .values({
          userId: user.id,
          chatroomId: chatroom.id,
          message: "Hei",
        })
      .returning();

      const [message2] = await db
        .insert(messages)
        .values({
          userId: user2.id,
          chatroomId: chatroom.id,
          message: "fra",
        })
      .returning();

      const [message3] = await db
        .insert(messages)
        .values({
          userId: user3.id,
          chatroomId: chatroom.id,
          message: "oss",
        })
      .returning();

      const [message4] = await db
        .insert(messages)
        .values({
          userId: user4.id,
          chatroomId: chatroom.id,
          message: "!!!",
        })
      .returning();

    console.log("Successfully inserted chatrooms..")
    console.log("Finished seeding! ..wait nothing went wrong? How unusual..");

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({
      success: false,
      error: "Failed to seed database!",
    });
  }
});