import { Result } from "../result";
import { User } from "../../user";

export interface UserRepository {
    findMany(): Promise<Result<User[] | null>>;
    findById(id: User["id"]): Promise<Result<User | null>>;
    create(userData: User): Promise<Result<User>>;
    update(id: User["id"], userData: Partial<User>): Promise<Result<User | null>>;
    delete(id: User["id"]): Promise<Result<User | null>>;
    findUserFriends(id: User["id"]): Promise<Result<User[] | null>>;
    addFriend(id: User["id"], friendId: User["id"]): Promise<Result<User>>;
}