import config from "@payload-config";
import { getPayload } from "payload";

import { projectCategorySeed } from "../lib/site";
import { slugify } from "../lib/utils";

async function seed() {
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
