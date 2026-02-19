import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";

import { Categories } from "./src/collections/Categories.ts";
import { Leads } from "./src/collections/Leads.ts";
import { Media } from "./src/collections/Media.ts";
import { Projects } from "./src/collections/Projects.ts";
import { Users } from "./src/collections/Users.ts";
import { resendEmailAdapter } from "./src/lib/payload-resend-adapter.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const lazyLexicalEditor = () => {
  return async (args: any) => {
    const { lexicalEditor } = await import("@payloadcms/richtext-lexical");
    return lexicalEditor({})(args);
  };
};

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? "replace-me-in-production",
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  admin: {
    user: "users"
  },
  email: resendEmailAdapter,
  editor: lazyLexicalEditor(),
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, "src/migrations"),
    schemaName: process.env.DATABASE_SCHEMA ?? "portfolio",
    pool: {
      connectionString: process.env.DATABASE_URI
    }
  }),
  collections: [Users, Categories, Media, Projects, Leads],
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts")
  }
});
