import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import { getPayload } from "payload";

import { projectCategorySeed } from "../lib/site";
import { slugify } from "../lib/utils.ts";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const projectDir = path.resolve(currentDir, "../..");

const require = createRequire(import.meta.url);
const { loadEnvConfig } = require("@next/env");

loadEnvConfig(projectDir);

async function seed() {
  if (!process.env.DATABASE_URI) {
    throw new Error("DATABASE_URI no esta configurado. Verifica /.env.local");
  }

  const { default: config } = await import("@payload-config");
  const payload = await getPayload({ config });

  for (const [index, name] of projectCategorySeed.entries()) {
    const slug = slugify(name);
    const existing = await payload.find({
      collection: "categories",
      where: {
        slug: {
          equals: slug
        }
      },
      limit: 1
    });

    if (existing.docs.length > 0) {
      continue;
    }

    await payload.create({
      collection: "categories",
      data: {
        name,
        slug,
        order: index,
        active: true
      }
    });

    payload.logger.info(`Categoria creada: ${name}`);
  }

  payload.logger.info("Seed completado.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
