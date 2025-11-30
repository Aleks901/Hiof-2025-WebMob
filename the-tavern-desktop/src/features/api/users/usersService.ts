"use server"

import { UserService } from "@packages/types/api/users/user-service";
import { User } from "@packages/types/user";
import { UserRepository } from "@packages/types/api/users/user-repository";
import { createUserRepository } from "./usersRepository";
import { getDb, type DB } from "@/db";

export function createUserService(userRepository: UserRepository): UserService {
    // So since the user service is going to be mostly useless and empty in this project,
    // I'm gonna take it upon myself to make a point of how we might've used this for "bussiness logic"
    const blackListedWords = ["AVeryBadWord"]
    // See where I'm going with this? :D
    // So anyways, what I figured is that typical "business logic" could be something such as checking
    // if the user has named themselves something we don't like.

    return {
        async listUsers() {
            const repositoryResult = await userRepository.findMany();
            return {
                ...repositoryResult,
            };
        },
        async getUserById(id: User["id"]) {
            const repositoryResult = await userRepository.findById(id);
            return {
                ...repositoryResult,
            };
        },
        async createUser(userData: User) {
            // There we go. Hope that serves as a decent enough example.
            // I'm sure I could've optimized this, even put it in a handlers file to reduce clutter.
            // But you get the gist.
            const invalidName = blackListedWords.includes(userData.name)
            if (invalidName){
                return {
                    error: {
                        message: "That's a bad word! How dare you!",
                        code: 403
                    },
                    success: false
                };
            };
            const repositoryResult = await userRepository.create(userData);
                return {
                ...repositoryResult,
            }
            
        },
        async updateUser(id: User["id"], userData: User) {
            const repositoryResult = await userRepository.update(id, userData);
            return {
                ...repositoryResult,
            };
        },
        async deleteUser(id: User["id"]) {
            const repositoryResult = await userRepository.delete(id);
            return {
                ...repositoryResult,
            };
        },

        async listUserFriends(id: User["id"]) {
            const repositoryResult = await userRepository.findUserFriends(id);
            return {
                ...repositoryResult,
            };
        },

        async addFriend(id: User["id"], friendId: User["id"]) {
            const repositoryResult = await userRepository.addFriend(id, friendId);
            return {
                ...repositoryResult,
            };
        },
    };
}

export const usersService = createUserService(createUserRepository(await getDb()));