import { User } from "@/db/schema/user-schema";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type DB } from "@/db";
import { verifyPassword } from "@/middleware/password";
import { AuthRepository } from "@packages/types/api/auth/auth-repository";

export function createAuthRepository(db: DB): AuthRepository {
    return {
        async login(name: string, password: string) {
            try {
                const result = await db
                    .select()
                    .from(users)
                    .where(eq(users.name, name))
                    .limit(1);

                const user = result[0];

                if (!user) {
                    return {
                        success: false,
                        error: {
                            message: "Invalid credentials",
                            code: 401,
                        }
                    };
                }
                const isPasswordValid = await verifyPassword(password, user.password);

                if (!isPasswordValid) {
                    return {
                        success: false,
                        error: {
                            message: "Invalid credentials",
                            code: 401,
                        }
                    };
                }

                const token = crypto.randomUUID();

                const [updatedUser] = await db
                    .update(users)
                    .set({ token })
                    .where(eq(users.id, user.id))
                    .returning({
                        id: users.id,
                        name: users.name,
                        password: users.password,
                        joinedAt: users.joinedAt,
                        role: users.role,
                        token: users.token,
                    });

                return {
                    success: true,
                    data: updatedUser
                };
            } catch (error) {
                console.error("Error during login:", error);
                return {
                    success: false,
                    error: {
                        message: "Login failed",
                        code: 500,
                    }
                };
            }
        },

        async logout(id: number) {
            try {
                const result = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, id))
                    .limit(1);

                if (!result.length) {
                    return {
                        success: false,
                        error: {
                            message: "User not found",
                            code: 404,
                        }
                    };
                }

                const [updatedUser] = await db
                    .update(users)
                    .set({ token: null })
                    .where(eq(users.id, id))
                    .returning({
                        id: users.id,
                        name: users.name,
                        password: users.password,
                        joinedAt: users.joinedAt,
                        role: users.role,
                        token: users.token,
                    });

                return {
                    success: true,
                    data: updatedUser
                };
            } catch (error) {
                console.error("Error during logout:", error);
                return {
                    success: false,
                    error: {
                        message: "Logout failed",
                        code: 500,
                    }
                };
            }
        }
    };
}
