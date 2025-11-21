import { User } from "../../user";
import { Result } from "../result";

export interface UserService {
    listUsers(): Promise<Result<Omit<User, 'password'>[] | null>>;
    getUserById(id: User["id"]): Promise<Result<Omit<User, 'password'> | null>>;
    createUser(userData: User): Promise<Result<Omit<User, 'password'>>>;
    updateUser(id: User["id"], userData: User): Promise<Result<Omit<User, 'password'> | null>>;
    deleteUser(id: User["id"]): Promise<Result<string | null>>;
    listUserFriends(userId: User["id"]): Promise<Result<Omit<User, 'password'>[] | null>>;
    addFriend(userId: User["id"], friendId: User["id"]): Promise<Result<Omit<User, 'password'> | null>>;
}