"use server"

import { UserService } from "@packages/types/api/users/user-service";
import { usersService } from "./usersService";
import { RequestInfo } from "rwsdk/worker";
import { User } from "@packages/types/user";


export function createUserController(usersService: UserService) {

    return {
        async listUsers(context: RequestInfo) {
            try {
                console.info("[API]", "Listing all users..")
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
            } catch (error) {
                console.error("[API]", "Failed to list users", error);
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
            console.info("[API]", `Fetching user with id ${id}..`)
            return new Response(
              JSON.stringify({
                ...dataFromService,
              }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          }catch (error) {
            console.error("[API]", "Failed to fetch user", error);
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

            if (!data.name || !data.password) {
              console.error("[API]", "Invalid user data provided");
              return new Response(
                JSON.stringify({
                  error: "Invalid user data provided",
                  success: false,
                }),
                {
                  status: 400,
                  headers: { "Content-Type": "application/json" },
                }
              );
            }
            
            const dataFromService = await usersService.createUser(data);
            console.info("[API]", `Attempting to create new user with name: ${data.name} and role: ${data.role}`);
            return new Response(
              JSON.stringify({
                ...dataFromService,
              }),
              {
                status: 201,
                headers: { "Content-Type": "application/json" },
              }
            );
          } catch (error) {
            console.error("[API]", "Failed to create user", error);
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
              console.error("[API]", `User with id ${id} doesn't exist`);
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
            console.info("[API]", `Updating user with id ${id}..`)
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
              console.error("[API]", `User with id ${id} doesn't exist`);
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
            console.info("[API]", `Deleting user with id ${id}..`)
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
          console.info("[API]", `Listing friends for user with id ${id}..`)
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
          console.info("[API]", `Adding friend with id ${data.friendId} to user with id ${id}..`)
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