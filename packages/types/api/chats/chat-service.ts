import { Chatroom } from "../../chat-room";
import { Result } from "../result";
import { User } from "../../user";
import { ChatMessage } from "../../chat-message";

export interface ChatService {
    listChats(): Promise<Result<Chatroom[] | null>>;
    getChatById(id: Chatroom["id"]): Promise<Result<Chatroom | null>>;
    createChat(chatData: Chatroom): Promise<Result<Chatroom | null>>;
    updateChat(id: Chatroom["id"], chatData: Chatroom): Promise<Result<Chatroom | null>>;
    deleteChat(id: Chatroom["id"]): Promise<Result<Chatroom | null>>;
    addUserToChat(chatId: Chatroom["id"], userId: User["id"]): Promise<Result<Chatroom | null>>;
    listChatUsers(chatId: Chatroom["id"]): Promise<Result<User[] | null>>;
    listChatMessages(chatId: Chatroom["id"]): Promise<Result<ChatMessage[] | null>>;
    createChatMessage(chatId: Chatroom["id"], messageData: ChatMessage): Promise<Result<ChatMessage | null>>;
}