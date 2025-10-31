import { UserService } from "@packages/types/api/users/user-service";
import { usersService } from "./usersService";
import { RequestInfo } from "rwsdk/worker";
import { User } from "@packages/types/user";


export function createUserController(usersService: UserService) {

    return {
        async listUsers(context: RequestInfo) {
            try {
                const dataFromService = await usersService.listUsers();
                return new Response(
                JSON.stringify({
                    ...dataFromService,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
                );
            } catch {
                return new Response(
                JSON.stringify({
                    error: "Failed to list users",
                    success: false,
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
                );
            }
        },
        async getUserById(context: RequestInfo) {
          try {
            const { id } = context.params;
            const dataFromService = await usersService.getUserById(Number(id));
            return new Response(
              JSON.stringify({
                ...dataFromService,
              }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          }catch {
            return new Response(
              JSON.stringify({
                error: "Failed to fetch user",
                success: false,
              }),
              {
                status: 500,
                headers: { "Content-Type": "application/json"}
              }
            );
          }
        },
        async createUser(context: RequestInfo) {
          try {
            const data = await context.request.json() as User;
            const dataFromService = await usersService.createUser(data);
            return new Response(
              JSON.stringify({
                ...dataFromService,
              }),
              {
                status: 201,
                headers: { "Content-Type": "application/json" },
              }
            );
          } catch {
            return new Response(
              JSON.stringify({
                error: "Failed to create user, user must be of type: { name: string; role: string; }",
                success: false,
              }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        },
        async updateUser(context: RequestInfo) {
            const { id } = context.params;
            const data = await context.request.json() as User;
            const dataFromService = await usersService.updateUser(Number(id), data);
            if (dataFromService == null){
              return new Response(
                JSON.stringify({
                  message: "User doesn't exist",
                  success: false,
                }),
                {
                  status: 400,
                  headers: { "Content-Type": "application/json" },
                }
              );
            }
            return new Response(
              JSON.stringify({
                ...dataFromService,
              }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
        },

        async deleteUser(context: RequestInfo) {
            const { id } = context.params;
            const dataFromService = await usersService.deleteUser(Number(id));
            if (dataFromService == null){
              return new Response(
                JSON.stringify({
                  message: "User doesn't exist",
                  success: false,
                }),
                {
                  status: 404,
                  headers: { "Content-Type": "application/json" },
                }
              );
            }
            return new Response(
              JSON.stringify({
                ...dataFromService,
              }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
        },

        async listUserFriends(context: RequestInfo) {
          const { id } = context.params;
          const dataFromService = await usersService.listUserFriends(Number(id));
          return new Response(
            JSON.stringify({
              ...dataFromService,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        },

        async addFriend(context: RequestInfo) {
          const { id } = context.params;
          const data = await context.request.json() as { friendId: number };
          const dataFromService = await usersService.addFriend(Number(id), data.friendId);
          return new Response(
            JSON.stringify({
              ...dataFromService,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        },
    };
}

export const usersController = createUserController(usersService);