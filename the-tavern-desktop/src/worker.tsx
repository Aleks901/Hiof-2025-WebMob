import { defineApp } from "rwsdk/worker";
import { layout, render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";

import { User, users } from "./db/schema/user-schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import { About } from "./app/pages/About";
import { Friends } from "./app/pages/Friends"
import { AppLayout } from "./app/layouts/AppLayout";

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
};

export default defineApp([
  setCommonHeaders(),
  render(Document, [
    layout(AppLayout, [
      route("/", async () => {
        const userResult = await drizzle(env.DB).select().from(users);
        return (
          <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Start</h1>
            <p>Velkommen til eksempel</p>
            <p>Databasen har {userResult.length} brukere</p>
            <div style={{ margin: "1.5rem 0" }}>
              <a
                href="/home"
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  background: "#0070f3",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontWeight: "500",
                }}
              >
                Go to Home Page
              </a>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#666" }}>
              Note: The home page is protected and requires authentication. You
              will be redirected to login if you're not signed in.
            </p>
          </div>
        );
      }),
      route("/home", [
        ({ ctx }) => {
          if (!ctx.user) {
            return new Response(null, {
              status: 302,
              headers: { Location: "/" },
            });
          }
        },
        Home,
      ]),
      route("/about", About),
      route("/friends", Friends)
    ]),
  ])
]);
