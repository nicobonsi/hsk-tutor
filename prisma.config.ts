import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

// Load .env.local for Next.js projects (Prisma CLI uses .env by default)
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
