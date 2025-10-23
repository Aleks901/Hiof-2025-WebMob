import { User } from "./user";
import { UserQueryParams } from "./userquery";
import { Result } from "./result";

export interface UserService {
    listUsers(params?: UserQueryParams): Promise<Result<User[]>>;
    getUserById(id: User["id"]): Promise<Result<User | null>>;
    createUser(userData: User): Promise<Result<User>>;
    updateUser(id: User["id"], userData: User): Promise<Result<User | null>>;
}