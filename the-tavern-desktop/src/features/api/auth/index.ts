import { getDb } from "@/db";
import { createAuthRepository } from "./authRepository";
import { createAuthService } from "./authService";
import { createAuthController } from "./authController";

const db = await getDb();
const authRepository = createAuthRepository(db);
const authService = createAuthService(authRepository);
export const authController = createAuthController(authService);

export { authRoutes } from "./authRoutes";
