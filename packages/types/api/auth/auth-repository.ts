import { Result } from "../result";
import { User } from "../../user";

export interface AuthRepository {
    login(name: string, password: string): Promise<Result<User>>;
    logout(id: number): Promise<Result<User>>;
}
