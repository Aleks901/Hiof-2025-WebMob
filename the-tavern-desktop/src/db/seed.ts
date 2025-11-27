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

    const [user6] = await db
      .insert(users)
      .values({
        name: "Sensor",
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
          imgref: "https://digitalpress.fra1.cdn.digitaloceanspaces.com/g06yzna/2023/10/lwg-tavern-encs-cover-1.jpg"
        })
      .returning();

      const [chatroom2] = await db
        .insert(chatrooms)
        .values({
          name: "Call of Duty",
          description: "Test Chatroom for 1337 gaming purposes..",
          imgref: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Call_of_Duty_Modern_Warfare_2_%282009%29_cover.png/250px-Call_of_Duty_Modern_Warfare_2_%282009%29_cover.png"
        })
      .returning();

      const [chatroom3] = await db
        .insert(chatrooms)
        .values({
          name: "World of Warcraft",
          description: "For those with no life",
          imgref: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/World_of_Warcraft.png/250px-World_of_Warcraft.png"
        })
      .returning();

      const [chatroom4] = await db
        .insert(chatrooms)
        .values({
          name: "Realm of the Mad God",
          description: "For those with their mother's credit card",
          imgref: "https://upload.wikimedia.org/wikipedia/en/f/fd/Realm_of_the_Mad_God_Exalt_title_screen.png"
        })
      .returning();

      const [chatroom5] = await db
        .insert(chatrooms)
        .values({
          name: "Minecraft",
          description: "For those with crafty ideas",
          imgref: "https://image.api.playstation.com/vulcan/ap/rnd/202407/0401/670c294ded3baf4fa11068db2ec6758c63f7daeb266a35a1.png"
        })
      .returning();

      const [chatroom6] = await db
        .insert(chatrooms)
        .values({
          name: "League of Legends",
          description: "For those with too much time on their hands",
          imgref: "https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2021/09/league-of-legends.jpeg?fit=1200%2C668&ssl=1"
        })
      .returning();

      const [chatroom7] = await db
        .insert(chatrooms)
        .values({
          name: "Diablo 2",
          description: "For those looking for neat loot and spooky monsters",
          imgref: "https://upload.wikimedia.org/wikipedia/en/d/d5/Diablo_II_Coverart.png"
        })
      .returning();

      const [chatroom8] = await db
        .insert(chatrooms)
        .values({
          name: "Super Mario 64",
          description: "..Yeah I don't know anymore lines to put here",
          imgref: "https://upload.wikimedia.org/wikipedia/en/e/e9/Super_Mario_64.png"
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