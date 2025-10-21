import { UserService } from "@packages/types/user-service";
import { UserQueryParams } from "@packages/types/userquery";
import { usersService } from "./usersService";
import { RequestInfo } from "rwsdk/worker";
import { User } from "@packages/types/user";


export function createUserController(usersService: UserService) {

    return {
        /**
         * GET api/v1/users - returns all users
         * 
         * GET api/v1/users?search=params - returns users based on search params
         */
        async listUsers(context: RequestInfo) {
            try {
                const searchParams = new URL(context.request.url).searchParams;
                const searchEntries = Object.fromEntries(searchParams.entries());
                const query = searchEntries as unknown as UserQueryParams;
                const dataFromService = await usersService.listUsers(query);
                return new Response(
                JSON.stringify({
                    ...dataFromService,
                    params: searchEntries,
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
        /**
         * GET api/v1/users/<id> - Returns user by id
         */
        async getUserById(context: RequestInfo) {
            const { id } = context.params;
            const dataFromService = await usersService.getUserById(id);
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
        /**
         * POST api/v1/users - Creates a new user
         */
        async createUser(context: RequestInfo) {
          try {
            const data = await context.request.json() as User;
            const dataFromService = await usersService.createUser(data);
            const validRole = ["regular", "admin"].includes(data.role);
            if (!validRole) {
              return new Response(
                JSON.stringify({
                  error: "Invalid user role. Role must be either 'regular' or 'admin'.",
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
        /**
         * PUT api/v1/users/<id> - Updates a user by id
         */
        async updateUser(context: RequestInfo) {
            const { id } = context.params;
            const data = await context.request.json() as Partial<User>;
            const dataFromService = await usersService.updateUser(id, data);
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