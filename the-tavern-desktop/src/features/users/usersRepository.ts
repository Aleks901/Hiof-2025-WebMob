
import { UserRepository } from "@packages/types/api/users/user-repository";
import { User } from "@/db/schema/user-schema";
import { users } from "@/db/schema"
import { eq } from "drizzle-orm";
import {type DB} from "@/db"

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
            try {
                const [newUser] = await db
                    .insert(users)
                    .values(data)
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
                const userToUpdate = await db.select().from(users).where(eq(users.id, id)).limit(1);                
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
            const userToDelete = await db.select().from(users).where(eq(users.id, id))
            if (userToDelete === null) {
                return {
                    success: false,
                    error: {
                        message: "Failed deleting user, no such user.",
                        code: 500,
                    }
                }
            }
            else {
                const [deletedUser] = await db.delete(users).where(eq(users.id, id)).returning();
                console.log("Deleting user..")
                return {
                    success: true,
                    data: deletedUser
                }
            }

        }
    };
}
