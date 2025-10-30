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
import { Home } from "./app/pages/Home";
import { setupDb, type DB} from "@/db"

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  db: DB;
};

export default defineApp([
  setCommonHeaders(),
  // Below is a relic of the past upon which many windows users have fallen..
  // It is kept around in case the rwsdk team neglects us once more..
  /* route("/api/seed", async () => {
    const result = await seedData(env);
    return Response.json({ success: true, ...result});
  }), */

  async function setup({ ctx }) {
    ctx.db = await setupDb(env.DB);
  },

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
      route("/chat/:id", ChatPage),
      route("/home", Home)
    ]),
  ])
]);
