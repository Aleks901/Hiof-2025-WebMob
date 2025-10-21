
import { UserRepository } from "@packages/types/user-repository";
import { User } from "@packages/types/user";


export function createUserRepository(): UserRepository {
    const users: User[] = [];

    return {
        async findMany(params = {}) {
            return { success: true, data: users };
        },
        async findById(id: number) {
            const user = users.find((user) => user.id === id);
            return { success: true, data: user || null };
        },
        async create(data: User) {
            const newUser: User = {
                id: users.length + 1,
                name: data.name,
                role: data.role,
                dateJoined: new Date(),
            };
            users.push(newUser);
            return { success: true, data: newUser };
        },
        async update(id: number, data: Partial<User>) {
            const userIndex = users.findIndex((user) => user.id === id);
            if (userIndex === -1) 
                return { 
                    success: false, 
                    data: null,
                    error: {
                        message: "User not found",
                        code: 404
                    }
                };
            users[userIndex] = { ...users[userIndex], ...data };
            return { success: true, data: users[userIndex] };
        },
    };
}