import { UserRepository } from "@packages/types/api/users/user-repository";
import { User } from "@/db/schema/user-schema";
import { messages, userChatrooms, userFriends, users } from "@/db/schema"
import { eq } from "drizzle-orm";
import {type DB} from "@/db"
import { hashPassword, verifyPassword } from "@/lib/password";

export function createUserRepository(db: DB): UserRepository {

    return {
        async findMany() {
            try {
                const data = await db
                    .select()
                    .from(users)
                return { success: true, data}
            }   catch (error) {
                console.error("Error grabbing all users", error)
                return { 
                    success: false,
                    error: {
                        message: "Error grabbing all users",
                        status: 500
                    }
                }
            }
        },
        async findById(id: number) {
            try {
                const result = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, id))
                    .limit(1);
                const fetchedUser = result[0] || null;
                return { success: true, data: fetchedUser }
            }   catch (error) {
                console.error("Error finding user with that id:", error);
                return {
                    success: false,
                    error: {
                        message: "No such user in db",
                        code: 500,
                    }
                }
            }
            
        },

        async create(data: User) {
            const invalidName = await db
                .select()
                .from(users)
                .where(eq(users.name, data.name))
                .limit(1);
            if (invalidName.length > 0) {
                return {
                    success: false,
                    error: {
                        message: "User with that name already exists.",
                        code: 409,
                    }
                }
            }
            try {
                const hashedPassword = await hashPassword(data.password);
                const [newUser] = await db
                    .insert(users)
                    .values({ ...data, password: hashedPassword })
                    .returning({
                    id: users.id,
                    name: users.name,
                    password: users.password,
                    joinedAt: users.joinedAt,
                    role: users.role,
                    token: users.token,
                });

                return { success: true, data: newUser}
            }   catch (error) {
                console.error("Error creating user:", error);
                return { 
                    success: false, 
                    error: {
                        message: "Failed creating user", 
                        code: 500,
                    }
                }
            }
        },

        async update(id: number, data: Partial<User>) {
            try {
                const userToUpdate = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, id))
                    .limit(1);                
                if (!userToUpdate.length) {
                    console.log("No user in db with that id..")
                    return {
                        success: false,
                        error: {
                            message: "Failed updating user info, no users found with that id.",
                            code: 404,
                        }
                    }
                }
                
                // Hash password if it's being updated
                if (data.password) {
                    data.password = await hashPassword(data.password);
                }
                
                const mergedData = { ...userToUpdate[0], ...data };
                const { id: _, ...updatedUserData } = mergedData;

                const [updatedUser] = await db
                    .update(users)
                    .set(updatedUserData)
                    .where(eq(users.id, id))
                    .returning({
                        id: users.id,
                        name: users.name,
                        password: users.password,
                        joinedAt: users.joinedAt,
                        role: users.role,
                        token: users.token,
                    });

                return { success: true, data: updatedUser };
            } catch (error) {
                console.error("Error updating user:", error);
                return {
                    success: false,
                    error: {
                        message: "Failed updating user",
                        code: 500,
                    }
                }
            }
        },
        async delete(id: number) {
            try {
                await db
                    .delete(messages)
                    .where(eq(messages.userId, id));

                await db
                    .delete(userChatrooms)
                    .where(eq(userChatrooms.userId, id));

                await db
                    .delete(userFriends)
                    .where(eq(userFriends.user_id, id));

                const userToDelete = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, id))
                    .limit(1);

                if (!userToDelete.length) {
                    return {
                        success: false,
                        error: {
                            message: "Failed deleting user, no such user.",
                            code: 404,
                        }
                    }
                }

                const [deletedUser] = await db
                    .delete(users)
                    .where(eq(users.id, id))
                    .returning();

                console.log("Deleting user..")
                return {
                    success: true,
                    data: deletedUser.name,
                    message: "User deleted successfully."
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                return {
                    success: false,
                    error: {
                        message: "Error deleting user",
                        code: 500,
                    }
                }
            }
        },
        async findUserFriends(id: number) {
            const friends = await db
                .select({
                    id: users.id,
                    name: users.name,
                    password: users.password,
                    joinedAt: users.joinedAt,
                    role: users.role,
                    token: users.token,
                })
                .from(userFriends)
                .innerJoin(users, eq(users.id, userFriends.friend_id))
                .where(eq(userFriends.user_id, id));

            return {
                success: true,
                data: friends as User[]
            };
        },
        async addFriend(id: number, friendId: number) {
            const userResult = await db
                .select()
                .from(users)
                .where(eq(users.id, id))
                .limit(1);
            const friendResult = await db
                .select()
                .from(users)
                .where(eq(users.id, friendId))
                .limit(1);

            if (!userResult.length || !friendResult.length) {
                return {
                    success: false,
                    error: {
                        message: "User or friend not found",
                        code: 404,
                    }
                };
            }

            await db.insert(userFriends).values({
                user_id: id,
                friend_id: friendId
            });
            const user = userResult[0];
            return {
                success: true,
                data: user
            };
        }
    };
}
