import { ChatRepository } from "@packages/types/api/chats/chat-repository";
import { Chatroom } from "@/db/schema/chatroom-schema";
import { chatrooms, messages, userChatrooms, users } from "@/db/schema"
import { eq, and } from "drizzle-orm"; // changed: add `and`
import {type DB} from "@/db"
import { ChatMessage } from "@packages/types/chat-message";

export function createChatRepository(db: DB): ChatRepository {

    return {
        async findMany() {
            try {
                const data = await db
                    .select()
                    .from(chatrooms)
                return { success: true, data}
            }   catch (error) {
                console.error("Error grabbing all chatrooms", error)
                return { 
                    success: false,
                    error: {
                        message: "Error grabbing all chatrooms",
                        status: 500
                    }
                }
            }
        },
        async findById(id: number) {
            try {
                const result = await db
                    .select()
                    .from(chatrooms)
                    .where(eq(chatrooms.id, id))
                    .limit(1);
                const fetchedChatroom = result[0] || null;
                if (fetchedChatroom === null) {
                    return {
                        success: false,
                        error: {
                            message: "Couldn't find chatroom.",
                            code: 204
                        }
                    }
                }
                return { success: true, data: fetchedChatroom }
            }   catch (error) {
                console.error("Error finding chatroom with that id:", error);
                return {
                    success: false,
                    error: {
                        message: "No such chatroom in db",
                        code: 500,
                    }
                }
            }
        },

        async create(data: Chatroom) {
            try {
                const result = await db
                    .insert(chatrooms)
                    .values(data)
                    .returning();
                return { success: true, data: result[0] }
            } catch (error) {
                console.error("Error creating chatroom:", error);
                return {
                    success: false,
                    error: {
                        message: "Error creating chatroom",
                        code: 500,
                    }
                }
            }
        },
        async update(id: number, data: Partial<Chatroom>) {
            try {
                const result = await db
                    .update(chatrooms)
                    .set(data)
                    .where(eq(chatrooms.id, id))
                    .returning();
                const updatedChatroom = result[0] || null;
                return { success: true, data: updatedChatroom }
            } catch (error) {
                console.error("Error updating chatroom:", error);
                return {
                    success: false,
                    error: {
                        message: "Error updating chatroom",
                        code: 500,
                    }
                }
            }
        },
        async delete(id: number) {
            try {
                const result = await db
                    .delete(chatrooms)
                    .where(eq(chatrooms.id, id))
                    .returning();
                const deletedChatroom = result[0] || null;
                return { success: true, data: deletedChatroom }
            } catch (error) {
                console.error("Error deleting chatroom:", error);
                return {
                    success: false,
                    error: {
                        message: "Error deleting chatroom",
                        code: 500,
                    }
                }
            }
        },
        async addUserToChat(chatId: number, userId: number) {
            try {
                if (!Number.isInteger(chatId) || !Number.isInteger(userId)) {
                    console.error("Invalid IDs received:", { chatId, userId, chatIdType: typeof chatId, userIdType: typeof userId });
                    return {
                        success: false,
                        error: {
                            message: "Invalid chatId or userId",
                            code: 400,
                        }
                    }
                }

                const userAlreadyInChat = await db
                    .select()
                    .from(userChatrooms)
                    .where(
                        and(
                            eq(userChatrooms.chatroomId, chatId),
                            eq(userChatrooms.userId, userId)
                        )
                    )
                    .limit(1);

                if (userAlreadyInChat.length > 0) {
                    return {
                        success: false,
                        error: {
                            message: "User is already in the chatroom",
                            code: 409,
                        }
                    }
                }

                await db
                    .insert(userChatrooms)
                    .values({ chatroomId: chatId, userId: userId });

                const result = await db
                    .select()
                    .from(chatrooms)
                    .where(eq(chatrooms.id, chatId))
                    .limit(1);

                const chatroom = result[0] || null;
                if (chatroom === null) {
                    return {
                        success: false,
                        error: {
                            message: "Couldn't find chatroom.",
                            code: 404
                        }
                    }
                }

                return { success: true, data: chatroom }
            } catch (error) {
                console.error("Error adding user to chatroom:", { chatId, userId, error });
                return {
                    success: false,
                    error: {
                        message: "Error adding user to chatroom",
                        code: 500,
                    }
                }
            }
        },
        async listChatUsers(chatId: number) {
            try {
                const rows = await db
                    .select({ user: users })
                    .from(users)
                    .innerJoin(userChatrooms, eq(userChatrooms.userId, users.id))
                    .where(eq(userChatrooms.chatroomId, chatId));
                const usersInChat = rows.map((r) => r.user);
                return {
                    success: true,
                    data: usersInChat,
                };
            } catch (error) {
                console.error("Error listing chat users:", { chatId, error });
                return {
                    success: false,
                    error: {
                        message: "Error listing chat users",
                        code: 500,
                    }
                };
            }
        },
        
        async listChatMessages(chatId: number) {
            try {
                const rows = await db
                    .select({ message: messages, user: users })
                    .from(messages)
                    .innerJoin(users, eq(messages.userId, users.id))
                    .where(eq(messages.chatroomId, chatId));

                const data: ChatMessage[] = rows.map((r) => ({
                    id: r.message.id,
                    message: r.message.message,
                    user: r.user,
                    dateSent: r.message.datesendt,
                }));

                return {
                    success: true,
                    data,
                };
            } catch (error) {
                console.error("Error listing chat messages:", { chatId, error });
                return {
                    success: false,
                    error: {
                        message: "Error listing chat messages",
                        code: 500,
                    }
                };
            }
        },

        async createChatMessage(chatId: number, messageData: ChatMessage) {
            try {
                const messager = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, messageData.user["id"]))
                    .limit(1);
                const chatRoom = await db
                    .select()
                    .from(chatrooms)
                    .where(eq(chatrooms.id, chatId))
                    .limit(1);
                if (chatRoom.length === 0) {
                    return {
                        success: false,
                        error: {
                            message: "Chatroom not found",
                            code: 404,
                        }
                    };
                }
                await db
                    .insert(messages)
                    .values({
                        userId: messager[0].id,
                        chatroomId: chatId,
                        message: messageData.message,
                    });
                return {
                    success: true,
                    data: messageData,
                };
            } catch (error) {
                console.error("Error creating chat message:", { chatId, messageData, error });
                return {
                    success: false,
                    error: {
                        message: "Error creating chat message",
                        code: 500,
                    }
                };
            }
        }
    };
}