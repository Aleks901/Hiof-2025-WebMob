import { User } from "../../user";
import { Result } from "../result";

export interface AuthService {
    login(name: string, password: string): Promise<Result<Omit<User, 'password'>>>;
    logout(id: number): Promise<Result<Omit<User, 'password'>>>;
}
