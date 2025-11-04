import { User } from "./user";
/**
 * Interface for chat messages.
 * 
 * @example
 * ```typescript 
 * const exampleMessage: ChatMessage = {
 *  id: 3001,
 *  message: "Hello!",
 *  user: {
 *      id: 123,
 *      name: "Meowingtons",
 *      role: "regular",
 *      dateJoined: new Date("2025-11-15T09:00:00Z")
 *  },
 *  dateSent: new Date("2025-11-15T10:00:00Z")
 * };
 * 
 * ```
 */
export interface ChatMessage{
    id: number,
    message: string,
    user: User,
    dateSent: string
}
