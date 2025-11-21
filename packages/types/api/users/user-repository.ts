import { Result } from "../result";
import { User } from "../../user";

export interface UserRepository {
    findMany(): Promise<Result<Omit<User, 'password'>[] | null>>;
    findById(id: User["id"]): Promise<Result<Omit<User, 'password'> | null>>;
    create(userData: User): Promise<Result<Omit<User, 'password'>>>;
    update(id: User["id"], userData: Partial<User>): Promise<Result<Omit<User, 'password'> | null>>;
    delete(id: User["id"]): Promise<Result<string | null>>;
    findUserFriends(id: User["id"]): Promise<Result<Omit<User, 'password'>[] | null>>;
    addFriend(id: User["id"], friendId: User["id"]): Promise<Result<Omit<User, 'password'>>>;
}