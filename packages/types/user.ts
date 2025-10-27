import { Role } from "./role";

/**
 * Interface to be used in creating and fetching users.
 * 
 * 
 * @example
 * ```typescript 
 * const exampleUser: User = {
 *  id: 123,
 *  name: "Meowingtons",
 *  role: "regular",
 *  dateJoined: new Date("2025-11-15T09:00:00Z") 
 * };
 * 
 * ```
 */
export interface User{
    id: number,
    name: string,
    password: string,
    joinedAt: Date,
    role: Role,
    token?: string | undefined
}
