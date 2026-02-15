import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";

import { Categories } from "./src/collections/Categories";
import { Leads } from "./src/collections/Leads";
import { Projects } from "./src/collections/Projects";
import { Users } from "./src/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? "replace-me-in-production",
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  admin: {
    user: "users"
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI
    }
  }),
  collections: [Users, Categories, Projects, Leads],
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts")
  }
});
