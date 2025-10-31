import { Chatroom } from "../../chat-room";
import { Result } from "../result";
import { User } from "../../user";

export interface ChatRepository {
    findMany(): Promise<Result<Chatroom[] | null>>;
    findById(id: Chatroom["id"]): Promise<Result<Chatroom | null>>;
    create(chatData: Chatroom): Promise<Result<Chatroom>>;
    update(id: Chatroom["id"], chatData: Partial<Chatroom>): Promise<Result<Chatroom | null>>;
    delete(id: Chatroom["id"]): Promise<Result<Chatroom | null>>;
    addUserToChat(chatId: Chatroom["id"], userId: User["id"]): Promise<Result<Chatroom>>;
    listChatUsers(chatId: Chatroom["id"]): Promise<Result<User[] | null>>;
}