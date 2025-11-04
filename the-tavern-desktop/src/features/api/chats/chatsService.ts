import { ChatService } from "@packages/types/api/chats/chat-service";
import { Chatroom } from "@packages/types/chat-room";
import { createChatRepository } from "./chatsRepository";
import { getDb, type DB } from "@/db";
import { User } from "@packages/types/user";
import { ChatRepository } from "@packages/types/api/chats/chat-repository";

// TODO: Make business logic :p

export function createChatService(chatsRepository: ChatRepository): ChatService {
    return {
        async listChats() {
            const repositoryResult = await chatsRepository.findMany();
            return {
                ...repositoryResult,
            };
        },
        async getChatById(id: Chatroom["id"]) {
            const repositoryResult = await chatsRepository.findById(id);
            return {
                ...repositoryResult,
            };
        },
        async createChat(data: Chatroom) {
            const repositoryResult = await chatsRepository.create(data);
            return {
                ...repositoryResult,
            };
        },
        async updateChat(id: Chatroom["id"], data: Chatroom) {
            const repositoryResult = await chatsRepository.update(id, data);
            return {
                ...repositoryResult,
            };
        },
        async deleteChat(id: Chatroom["id"]) {
            const repositoryResult = await chatsRepository.delete(id);
            return {
                ...repositoryResult,
            };
        },
        async addUserToChat(chatId: Chatroom["id"], userId: User["id"]) {
            const repositoryResult = await chatsRepository.addUserToChat(chatId, userId);
            return {
                ...repositoryResult,
            };
        },
        async listChatUsers(chatId: Chatroom["id"]) {
            const repositoryResult = await chatsRepository.listChatUsers(chatId);
            return {
                ...repositoryResult,
            };
        },
        async listChatMessages(chatId: Chatroom["id"]) {
            const repositoryResult = await chatsRepository.listChatMessages(chatId);
            return {
                ...repositoryResult,
            };
        },
        async createChatMessage(chatId: Chatroom["id"], messageData) {
            const repositoryResult = await chatsRepository.createChatMessage(chatId, messageData);
            return {
                ...repositoryResult,
            };
        }
    };
}

export const chatsService = createChatService(createChatRepository(await getDb()));
