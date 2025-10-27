import { Result } from "./result";
import { User } from "./user";

export interface UserRepository {
    findMany(params?: any): Promise<Result<User[]>>;
    findById(id: User["id"]): Promise<Result<User | null>>;
    create(userData: User): Promise<Result<User>>;
    update(id: User["id"], userData: User): Promise<Result<User | null>>;
}