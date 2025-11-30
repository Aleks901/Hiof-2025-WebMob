"use server"

import { AuthRepository } from "@packages/types/api/auth/auth-repository";
import { AuthService } from "@packages/types/api/auth/auth-service";

export function createAuthService(authRepository: AuthRepository): AuthService {
    return {
        async login(name: string, password: string) {
            if (!name || !password) {
                return {
                    success: false,
                    error: {
                        message: "Username and password are required",
                        code: 400,
                    }
                };
            }

            if (name.trim().length === 0) {
                return {
                    success: false,
                    error: {
                        message: "Username cannot be empty",
                        code: 400,
                    }
                };
            }

            if (password.length < 3) {
                return {
                    success: false,
                    error: {
                        message: "Password must be at least 3 characters",
                        code: 400,
                    }
                };
            }

            const repositoryResult = await authRepository.login(name, password);

            if (!repositoryResult.success) {
                return repositoryResult;
            }

            const { password: _, ...userWithoutPassword } = repositoryResult.data;

            return {
                success: true,
                data: userWithoutPassword
            };
        },

        async logout(id: number) {
            const repositoryResult = await authRepository.logout(id);

            if (!repositoryResult.success) {
                return repositoryResult;
            }

            const { password: _, ...userWithoutPassword } = repositoryResult.data;

            return {
                success: true,
                data: userWithoutPassword
            };
        }
    };
}
