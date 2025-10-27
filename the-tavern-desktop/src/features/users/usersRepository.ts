
import { UserRepository } from "@packages/types/user-repository";
import { User } from "@packages/types/user";


export function createUserRepository(): UserRepository {
    // Temp list to hold users before we get the db up and running
    const users: User[] = [{id: 1, name: "Aleks", role: "admin", dateJoined: new Date()}];

    return {
        async findMany(params = {}) {
            return { success: true, data: users };
        },
        async findById(id: number) {
            const user = users.find((user) => user.id === id);
            if (user == null)
                return {
                    success: false,
                    error: {
                        message: "User not found",
                        code: 404
                    }
                };
            else {
                return { 
                    success: true, 
                    data: user
                };
            }
        },
        async create(data: User) {
            const newUser: User = {
                id: users.length + 1,
                name: data.name,
                role: data.role,
                dateJoined: new Date(),
            };
            const validateNewUser = (user: User): boolean => {
                return user.id != null && 
                       user.name != null && 
                       user.role != null && 
                       user.dateJoined != null;
            };

            if (!validateNewUser(newUser)) {
                return {
                    success: false,
                    error: {
                        message: "Invalid user data, try again.",
                        code: 400
                    }
                };
            }
            else {
                users.push(newUser);
                return { 
                    success: true, 
                    data: newUser };
            }
        },
        async update(id: number, data: User) {
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