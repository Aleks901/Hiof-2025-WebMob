// src/db/index.ts
"use server";

import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

let dbInstance: DrizzleD1Database<typeof schema> | null = null;

async function getWorkerEnv(): Promise<D1Database> {
  try {
    const { env } = await import("cloudflare:workers");

    if (!env || !env.DB) {
      throw new Error("D1 database instance not found in worker environment");
    }
    return env.DB as D1Database;
  } catch (error) {
    throw new Error(
      "Failed to get D1 database instance from worker environment"
    );
  }
}

export function createDatabase(
  d1Database: D1Database
): DrizzleD1Database<typeof schema> {
  if (!d1Database) {
    throw new Error("D1 database instance is required");
  }
  return drizzle(d1Database, { schema });
}

export function setupDb(d1Database: D1Database) {
  if (dbInstance) {
    return dbInstance;
  }
  dbInstance = createDatabase(d1Database);
  return dbInstance;
}

export async function getDb(): Promise<DrizzleD1Database<typeof schema>> {
  if (!dbInstance) {
    console.log("No database instance found, creating one..")
    dbInstance = createDatabase(await getWorkerEnv());
  }
  console.log("Database connected.")
  return dbInstance;
}

export type DB = DrizzleD1Database<typeof schema>;