import { Result } from "./result";
import { User } from "./user";

export interface UserRepository {
    findMany(params?: any): Promise<Result<User[]>>;
    findById(id: number): Promise<Result<User | null>>;
    create(userData: Partial<User>): Promise<Result<User>>;
    update(id: number, userData: Partial<User>): Promise<Result<User | null>>;
}