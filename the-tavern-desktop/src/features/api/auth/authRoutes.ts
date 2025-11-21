import { route } from "rwsdk/router";
import { authController } from "./index";

export const authRoutes = [
    route("/login", async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        if (method === "post") {
            return authController.login(ctx);
        }
        return new Response(
            JSON.stringify({
                message: "Method not allowed",
                success: false,
            }),
            {
                status: 405,
                headers: { "Content-Type": "application/json" },
            }
        );
    }),

    route("/logout", async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        if (method === "post") {
            return authController.logout(ctx);
        }
        return new Response(
            JSON.stringify({
                message: "Method not allowed",
                success: false,
            }),
            {
                status: 405,
                headers: { "Content-Type": "application/json" },
            }
        );
    }),
];
