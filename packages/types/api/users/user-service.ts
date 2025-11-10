import { User } from "../../user";
import { Result } from "../result";

export interface UserService {
    listUsers(): Promise<Result<User[] | null>>;
    getUserById(id: User["id"]): Promise<Result<User | null>>;
    createUser(userData: User): Promise<Result<User>>;
    updateUser(id: User["id"], userData: User): Promise<Result<User | null>>;
    deleteUser(id: User["id"]): Promise<Result<string | null>>;
    listUserFriends(userId: User["id"]): Promise<Result<User[] | null>>;
    addFriend(userId: User["id"], friendId: User["id"]): Promise<Result<User | null>>;
}