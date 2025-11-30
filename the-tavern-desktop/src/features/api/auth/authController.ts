"use server"

import { AuthService } from "@packages/types/api/auth/auth-service";
import { RequestInfo } from "rwsdk/worker";

export function createAuthController(authService: AuthService) {
    return {
        async login(context: RequestInfo) {
            try {
                const data = await context.request.json() as { name: string; password: string };
                
                if (!data.name || !data.password) {
                    return new Response(
                        JSON.stringify({
                            error: {
                                message: "Username and password are required",
                                code: 400,
                            },
                            success: false,
                        }),
                        {
                            status: 400,
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                }

                const result = await authService.login(data.name, data.password);

                if (!result.success) {
                    return new Response(
                        JSON.stringify(result),
                        {
                            status: result.error.code || 401,
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                }

                return new Response(
                    JSON.stringify(result),
                    {
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } catch (error) {
                console.error("Login controller error:", error);
                return new Response(
                    JSON.stringify({
                        error: {
                            message: "Invalid request format",
                            code: 400,
                        },
                        success: false,
                    }),
                    {
                        status: 400,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
        },

        async logout(context: RequestInfo) {
            try {
                const data = await context.request.json() as { id: number };

                if (!data.id) {
                    return new Response(
                        JSON.stringify({
                            error: {
                                message: "User ID is required",
                                code: 400,
                            },
                            success: false,
                        }),
                        {
                            status: 400,
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                }

                const result = await authService.logout(data.id);

                if (!result.success) {
                    return new Response(
                        JSON.stringify(result),
                        {
                            status: result.error.code || 500,
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                }

                return new Response(
                    JSON.stringify(result),
                    {
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } catch (error) {
                console.error("Logout controller error:", error);
                return new Response(
                    JSON.stringify({
                        error: {
                            message: "Invalid request format",
                            code: 400,
                        },
                        success: false,
                    }),
                    {
                        status: 400,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
        }
    };
}
