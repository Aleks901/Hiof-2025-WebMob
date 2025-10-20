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

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
};

export default defineApp([
  setCommonHeaders(),
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
          </div>
        );
      }),
      route("/about", About),
      route("/friends", Friends)
    ]),
  ])
]);
