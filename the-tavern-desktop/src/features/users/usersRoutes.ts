
import { route } from "rwsdk/router";
import { usersController } from "./usersController";

export const userRoutes = [
    route("/",
      async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
          case "get":
            return usersController.listUsers(ctx);
          case "post":
            return usersController.createUser(ctx);
          default:
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
        }
      },
    ),
    route("/:id", (ctx) => {
      const method = ctx.request.method.toLowerCase();
      switch (method) {
        case "get":
          return usersController.getUserById(ctx);
        case "put":
          return usersController.updateUser(ctx);
        default:
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
      }
    })];