import { UserService } from "@packages/types/user-service";
import { User } from "@packages/types/user";
import { UserRepository } from "@packages/types/user-repository";
import { createUserRepository } from "./usersRepository";

export function createUserService(userRepository: UserRepository): UserService {
    return {
        async listUsers(params = {}) {
            const repositoryResult = await userRepository.findMany(params);
            // Bussiness logic might go here but honestly I don't see the point yet,
            // I'll literally just slip through this file like a ninja for now.
            return {
                ...repositoryResult,
            };
        },
        async getUserById(id: User["id"]) {
            const repositoryResult = await userRepository.findById(id);
            // You get the deal
            return {
                ...repositoryResult,
            };
        },
        async createUser(userData: Partial<User>) {
            const repositoryResult = await userRepository.create(userData);
            // You get the deal
            return {
                ...repositoryResult,
            };
        },
        async updateUser(id: User["id"], userData: Partial<User>) {
            const repositoryResult = await userRepository.update(id, userData);
            // You get the deal
            return {
                ...repositoryResult,
            };
        }
    };
}

export const usersService = createUserService(createUserRepository());