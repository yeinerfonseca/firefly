import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle/migrations/',
  schema: './drizzle/schema.ts',
  migrations: {
    prefix: 'timestamp',
    table: '__drizzle_migrations__',
  },
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
})
