"use server"

import { chatsService } from "./chatsService";
import { ChatService } from "@packages/types/api/chats/chat-service";
import { Chatroom } from "@packages/types/chat-room";
import { RequestInfo } from "rwsdk/worker";


export function createChatController(chatsService: ChatService) {

    return {
        async listChats(context: RequestInfo) {
            try {
                const dataFromService = await chatsService.listChats();
                console.info("[API]", "Fetching chatrooms..")
                return new Response(
                JSON.stringify({
                    ...dataFromService,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
                );
            } catch (error) {
                console.error("[API]", "Failed to list chats", error);
                return new Response(
                    JSON.stringify({
                        message: "Failed to list chats",
                        success: false,
                    }),
                    {
                        status: 500,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
        },
        async getChatById(context: RequestInfo) {
          try {
            const { id } = context.params;
            const dataFromService = await chatsService.getChatById(Number(id));
            console.info("[API]", `Fetching chat with id ${id}..`)
            return new Response(
              JSON.stringify({
                ...dataFromService,
              }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          } catch (error) {
            console.error("[API]", "Failed to get chat", error);
            return new Response(
              JSON.stringify({
                message: "Failed to get chat",
                success: false,
              }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        },

        async createChat(context: RequestInfo) {
          try {
            const data = await context.request.json() as Chatroom;
            const dataFromService = await chatsService.createChat(data);
            console.info("[API]", "Creating a new chat..")
            return new Response(
              JSON.stringify({
                ...dataFromService,
              }),
              {
                status: 201,
                headers: { "Content-Type": "application/json" },
              }
            );
          } catch (error) {
            console.error("[API]", "Failed to create chat", error);
            return new Response(
              JSON.stringify({
                message: "Failed to create chat",
                success: false,
              }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        },
        async updateChat(context: RequestInfo) {
            try {
              const { id } = context.params;
              const data = await context.request.json() as Chatroom;
              const dataFromService = await chatsService.updateChat(Number(id), data);
              console.info("[API]", `Updating chat with id ${id}..`)
              return new Response(
                JSON.stringify({
                  ...dataFromService,
                }),
                {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                }
              );
            } catch (error) {
              console.error("[API]", "Failed to update chat", error);
              return new Response(
                JSON.stringify({
                  message: "Failed to update chat",
                  success: false,
                }),
                {
                  status: 500,
                  headers: { "Content-Type": "application/json" },
                }
              );
            }
          },
        async deleteChat(context: RequestInfo) {
            try {
              const { id } = context.params;
              const dataFromService = await chatsService.deleteChat(Number(id));
              if (dataFromService == null){
                console.error("[API]", `Chat with id ${id} doesn't exist`);
                return new Response(
                  JSON.stringify({
                    message: "Chat doesn't exist",
                    success: false,
                  }),
                  {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                  }
                );
              }
              console.info("[API]", `Deleting chat with id ${id}..`)
              return new Response(
                JSON.stringify({
                  message: "Chat deleted successfully",
                  success: true,
                }),
                {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                }
              );
            } catch (error) {
              console.error("[API]", "Failed to delete chat", error);
              return new Response(
                JSON.stringify({
                  message: "Failed to delete chat",
                  success: false,
                }),
                {
                  status: 500,
                  headers: { "Content-Type": "application/json" },
                }
              );
            }
          },
        async addUserToChat(context: RequestInfo) {
            try {
              const { id } = context.params;
              const body = await context.request.json() as { userId: number };
              
              const chatId = Number(id);
              const userId = Number(body.userId);

              if (!Number.isInteger(chatId) || !Number.isInteger(userId)) {
                console.error("[API]", "Invalid chatId or userId");
                return new Response(
                  JSON.stringify({
                    message: "Invalid chatId or userId",
                    success: false,
                  }),
                  {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                  }
                );
              }

              const dataFromService = await chatsService.addUserToChat(chatId, userId);
              console.info("[API]", `Adding user ${userId} to chat ${chatId}..`)
              return new Response(
                JSON.stringify({
                  ...dataFromService,
                }),
                {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                }
              );
            } catch (error) {
              console.error("[API]", "Failed to add user to chat", error);
              return new Response(
                JSON.stringify({
                  message: "Failed to add user to chat",
                  success: false,
                }),
                {
                  status: 500,
                  headers: { "Content-Type": "application/json" },
                }
              );
            }
        },

        async listChatUsers(context: RequestInfo) {
            try {
                const { id } = context.params;
                console.info("[API]", `Listing users for chat with id ${id}..`);
                const dataFromService = await chatsService.listChatUsers(Number(id));
                return new Response(
                JSON.stringify({
                    ...dataFromService,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
                );
            } catch (error) {
                console.error("[API]", "Failed to list chat users", error);
                return new Response(
                    JSON.stringify({
                        message: "Failed to list chat users",
                        success: false,
                    }),
                    {
                        status: 500,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
        },

        //^^^^^^^^^^^^^^^^^^^^
        // These two functions are literally identical up until the repository layer. I feel like we could abstract
        // This type of stuff. Just not sure how to do it in a way that would make sense. 
        // Any PR review inputs? If you're reading this, send me a "Hello I read that". :p
        // \/ \/ \/ \/ \/ \/ \/ 

        async listChatMessages(context: RequestInfo) {
            try {
                const { id } = context.params;
                const dataFromService = await chatsService.listChatMessages(Number(id));
                return new Response(
                    JSON.stringify({
                        ...dataFromService,
                    }),
                    {
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } catch (error) {
                console.error("[API]", "Failed to list chat messages", error);
                return new Response(
                    JSON.stringify({
                        message: "Failed to list chat messages",
                        success: false,
                    }),
                    {
                        status: 500,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
        },

        async createChatMessage(context: RequestInfo) {
            try {
                const { id } = context.params;
                const chatId = Number(id);
                const body = await context.request.json() as { message: string; userId: number };
                const validMessage =
                  Number.isInteger(chatId) &&
                  Number.isInteger(body.userId) &&
                  typeof body.message === "string" &&
                  body.message.trim() !== "";

                if (!validMessage) {
                  console.error("[API]", "Invalid chatId, userId or message");
                  return new Response(
                    JSON.stringify({
                      message: "Invalid chatId, userId or message",
                      success: false,
                    }),
                    {
                      status: 400,
                      headers: { "Content-Type": "application/json" },
                    }
                  );
                }

                const messageData = {
                    message: body.message,
                    user: { id: body.userId },
                } as any;

                const dataFromService = await chatsService.createChatMessage(chatId, messageData);
                console.info("[API]", `User with ID: ${messageData.user.id} is attempting to create message in chat with id ${chatId}. Message content: "${messageData.message}"`);
                return new Response(
                    JSON.stringify({
                        ...dataFromService,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } catch (error) {
                console.error("[API]", "Failed to create chat message", error);
                return new Response(
                    JSON.stringify({
                        message: "Failed to create chat message",
                        success: false,
                    }),
                    {
                        status: 500,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
        },
    };
}


export const chatsController = createChatController(chatsService);