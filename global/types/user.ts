import { Role } from "./role";

export interface User{
    id: number,
    name: string,
    role: Role,
    dateJoined: Date
}