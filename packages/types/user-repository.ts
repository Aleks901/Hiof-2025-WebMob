import { Result } from "./result";


export interface UserRepository {
    findMany(params?: any): Promise<Result<any[]>>;
    findById(id: number): Promise<Result<any | null>>;
    create(userData: Partial<any>): Promise<Result<any>>;
    update(id: number, userData: Partial<any>): Promise<Result<any | null>>;
}