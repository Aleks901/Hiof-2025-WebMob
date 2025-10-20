import { User } from "@packages/types/user";
import { UserQueryParams } from "@packages/types/userquery";
import { Result } from "@packages/types/result";

export interface UserService {
    listUsers(params?: UserQueryParams): Promise<Result<User[]>>;
    getUserById(id: User["id"]): Promise<Result<User | null>>;
    createUser(userData: Partial<User>): Promise<Result<User>>;
    updateUser(id: User["id"], userData: Partial<User>): Promise<Result<User | null>>;
}