import { defineApp } from "rwsdk/worker";
import { layout, prefix, render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { User, users } from "./db/schema/user-schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import { About } from "./app/pages/About";
import { Friends } from "./app/pages/Friends"
import { AppLayout } from "./app/layouts/AppLayout";
import { userRoutes } from "./features/users/usersRoutes";
import { UserPage } from "./app/pages/UserPage";
import { ChatPage } from "./app/pages/ChatPage";
import LoginForm from "./app/components/login-form";
import { seedData } from "./db/seed";

export type AppContext = {
  user: User | undefined;
  authUrl: string;
};

export default defineApp([
  setCommonHeaders(),
  route("/api/seed", async () => {
    const result = await seedData(env);
    return Response.json({ success: true, ...result});
  }),
  prefix("/api/v1/users", userRoutes),
  render(Document, [
    layout(AppLayout, [
      route("/", async () => {
        const userResult = await drizzle(env.DB).select().from(users);
        return (
          <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Start</h1>
            <p>Velkommen til eksempel</p>
            <p>Databasen har {userResult.length} brukere</p>
            <LoginForm/>
          </div>
        );
      }),
      route("/about", About),
      route("/friends", Friends),
      route("/user/:id", UserPage),
      route("/chat/:id", ChatPage)
    ]),
  ])
]);
