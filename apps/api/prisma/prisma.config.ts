import 'dotenv/config';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join(__dirname, 'schema.prisma'),
  migrations: {
    path: path.join(__dirname, 'migrations'),
  },
  datasource: {
    // Using process.env directly to avoid errors when DATABASE_URL is not set (e.g., during prisma generate)
    url: process.env.DATABASE_URL ?? '',
  },
});
