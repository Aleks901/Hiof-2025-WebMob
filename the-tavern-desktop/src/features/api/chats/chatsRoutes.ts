import { route } from "rwsdk/router";
import { chatsController } from "./chatsController";

export const chatsRoutes = [
    route("/",
      async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
          case "get":
            return chatsController.listChats(ctx);
          case "post":
            return chatsController.createChat(ctx);
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
          return chatsController.getChatById(ctx);
        case "patch":
          return chatsController.updateChat(ctx);
        case "delete":
          return chatsController.deleteChat(ctx);
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
    }
    ),
    route("/:id/users", (ctx) => {
      const method = ctx.request.method.toLowerCase();
      switch (method) {
        case "post":
          return chatsController.addUserToChat(ctx);
        case "get":
          return chatsController.listChatUsers(ctx);
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
    }),
    route("/:id/messages", (ctx) => {
      const method = ctx.request.method.toLowerCase();
      switch (method) {
        case "get":
          return chatsController.listChatMessages(ctx);
        case "post":
          return chatsController.createChatMessage(ctx);
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
    }),
];