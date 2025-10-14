
/**
 * A chatroom object representing a chat room.
 * 
 * @example
 * ```typescript
 * const exampleChatroom: Chatroom = {
 *  id: "1",
 *  name: "General Chat",
 *  description: "A chatroom for generals :^)",
 *  image: "path/to/image.png"
 * };
 * ```
 */

export interface Chatroom {
  id: string;
  name: string;
  description: string;
  image: any;
}
