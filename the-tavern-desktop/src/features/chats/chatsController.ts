import { chatsService } from "./chatsService";
import { ChatService } from "@packages/types/api/chats/chat-service";
import { Chatroom } from "@packages/types/chat-room";
import { get } from "http";
import { RequestInfo } from "rwsdk/worker";


export function createChatController(chatsService: ChatService) {

    return {
        async listChats(context: RequestInfo) {
            try {
                const dataFromService = await chatsService.listChats();
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
}
}


export const chatsController = createChatController(chatsService);