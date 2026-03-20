import "dotenv/config";
import type { PrismaConfig } from "prisma";
import { env } from "prisma/config";

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export const adapter = (type: "mysql" | "postgresql") => {
  if (type === "postgresql")
    return new PrismaPg({
      connectionString: env("DATABASE_URL"),
    });
  else if (type === "mysql")
    return new PrismaMariaDb({
      host: env("DATABASE_HOST"),
      user: env("DATABASE_USER"),
      password: env("DATABASE_PASSWORD"),
      database: env("DATABASE_NAME"),
      connectionLimit: 5,
    });
  else return;
};

export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
} satisfies PrismaConfig;
