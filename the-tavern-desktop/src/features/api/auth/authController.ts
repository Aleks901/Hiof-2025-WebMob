"use server"

import { AuthService } from "@packages/types/api/auth/auth-service";
import { RequestInfo } from "rwsdk/worker";

export function createAuthController(authService: AuthService) {
    return {
        async login(context: RequestInfo) {
            try {
                const data = await context.request.json() as { name: string; password: string };
                console.info("[AUTH]", `${data.name} is attempting to log in.`);
                
                if (!data.name || !data.password) {
                    console.error("[AUTH]", "Username and password are required");
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
                    console.error("[AUTH]", `Login failed for user: ${data.name}`);
                    return new Response(
                        JSON.stringify(result),
                        {
                            status: result.error.code || 401,
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                }
                console.info("[AUTH]", `${data.name} has successfully logged in.`);
                return new Response(
                    JSON.stringify(result),
                    {
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } catch (error) {
                console.error("[AUTH]", "Login controller error:", error);
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
                console.info("[AUTH]", `Attempting logout for user ID: ${data.id}`);
                if (!data.id) {
                    console.error("[AUTH]", "No user ID provided for logout");
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
                console.info("[AUTH]", `${data.id} has successfully logged out.`);
                return new Response(
                    JSON.stringify(result),
                    {
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } catch (error) {
                console.error("[AUTH]", "Logout controller error:", error);
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
