/**
 * Seeds the CMS from /content and creates the first admin user.
 * Every seeded row is marked isDemo = true so it can be removed later:
 *   DELETE FROM articles WHERE is_demo; (etc.)
 * Never touches `leads` or `subscribers`.
 *
 * Run: npm run db:seed
 */
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { services } from "../content/services";
import { industries } from "../content/industries";
import { team, teamCategories } from "../content/team";
import { articles, authors, categories, contentTypes, resources } from "../content/insights";
import { slugify } from "../lib/utils";

const prisma = new PrismaClient();
const demo = { isDemo: true, status: "published" as const };

async function main() {
  // Taxonomies
  for (const [i, c] of categories.entries())
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: { ...c, ...demo, displayOrder: i } });
  for (const [i, c] of contentTypes.entries())
    await prisma.contentType.upsert({ where: { slug: c.slug }, update: {}, create: { ...c, ...demo, displayOrder: i } });
  for (const [i, c] of teamCategories.entries())
    await prisma.teamCategory.upsert({ where: { slug: c.slug }, update: {}, create: { ...c, ...demo, displayOrder: i } });
  for (const a of authors)
    await prisma.author.upsert({ where: { slug: a.slug }, update: {}, create: { slug: a.slug, name: a.name, role: a.role, bio: a.bio, linkedin: a.linkedin, ...demo } });
  const tagNames = [...new Set(articles.flatMap((a) => a.tags))];
  for (const t of tagNames) await prisma.tag.upsert({ where: { slug: slugify(t) }, update: {}, create: { slug: slugify(t), name: t, ...demo } });

  // Services
  for (const [i, s] of services.entries()) {
    const data = {
      number: s.number, title: s.title, shortTitle: s.shortTitle, headline: s.headline, description: s.description, icon: s.icon,
      challenge: s.challenge, capabilities: s.capabilities, flow: s.flow, challenges: s.challenges, perspective: s.perspective,
      outcomes: s.outcomes, related: s.related, faq: s.faq, displayOrder: i,
    };
    await prisma.service.upsert({ where: { slug: s.slug }, update: {}, create: { slug: s.slug, ...data, ...demo } });
  }

  // Industries (+ industry ↔ service)
  for (const [i, ind] of industries.entries()) {
    const row = await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: {},
      create: {
        slug: ind.slug, number: ind.number, name: ind.name, headline: ind.headline, summary: ind.summary, context: ind.context,
        scopeNote: ind.scopeNote ?? null, considerations: ind.considerations, challenges: ind.challenges, topics: ind.topics,
        displayOrder: i, ...demo,
      },
    });
    const svc = await prisma.service.findMany({ where: { slug: { in: ind.services } } });
    await prisma.industryService.createMany({ data: svc.map((s) => ({ industryId: row.id, serviceId: s.id })), skipDuplicates: true });
  }

  // Team (placeholders)
  for (const [i, m] of team.entries()) {
    const cat = await prisma.teamCategory.findUnique({ where: { slug: m.category } });
    await prisma.teamMember.upsert({
      where: { slug: m.slug },
      update: {},
      create: {
        slug: m.slug, name: m.name, designation: m.designation, qualification: m.qualification, categoryId: cat?.id,
        expertise: m.expertise, bio: m.bio, focus: m.focus, photo: m.photo, linkedin: m.linkedin, featured: m.featured,
        displayOrder: i, ...demo,
      },
    });
  }

  // Articles (+ joins)
  for (const a of articles) {
    const [cat, type, author] = await Promise.all([
      prisma.category.findUnique({ where: { slug: a.category } }),
      prisma.contentType.findUnique({ where: { slug: a.contentType } }),
      a.author ? prisma.author.findUnique({ where: { slug: a.author.slug } }) : null,
    ]);
    const row = await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        slug: a.slug, title: a.title, subtitle: a.subtitle, excerpt: a.excerpt, body: a.body, keyTakeaways: a.keyTakeaways,
        readingTime: a.readingTime, featured: a.featured, publishedAt: new Date(a.publishedAt), categoryId: cat?.id,
        contentTypeId: type?.id, authorId: author?.id, searchExtra: [a.categoryName, ...a.tags].join(" "), ...demo,
      },
    });
    const [inds, svcs, tags] = await Promise.all([
      prisma.industry.findMany({ where: { slug: { in: a.industries } } }),
      prisma.service.findMany({ where: { slug: { in: a.services } } }),
      prisma.tag.findMany({ where: { slug: { in: a.tags.map(slugify) } } }),
    ]);
    await prisma.articleIndustry.createMany({ data: inds.map((x) => ({ articleId: row.id, industryId: x.id })), skipDuplicates: true });
    await prisma.articleService.createMany({ data: svcs.map((x) => ({ articleId: row.id, serviceId: x.id })), skipDuplicates: true });
    await prisma.articleTag.createMany({ data: tags.map((x) => ({ articleId: row.id, tagId: x.id })), skipDuplicates: true });
  }

  for (const [i, r] of resources.entries())
    await prisma.resource.upsert({
      where: { slug: r.slug },
      update: {},
      create: { slug: r.slug, title: r.title, description: r.description, resourceType: r.resourceType, fileUrl: r.fileUrl, gated: r.gated, displayOrder: i, ...demo },
    });

  await prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });

  // First admin
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  if (email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
      const password = process.env.ADMIN_BOOTSTRAP_PASSWORD || randomBytes(15).toString("base64url");
      await prisma.user.create({ data: { email, role: "admin", passwordHash: await bcrypt.hash(password, 12) } });
      console.log(`\nAdmin user created: ${email}`);
      if (!process.env.ADMIN_BOOTSTRAP_PASSWORD) console.log(`One-time password: ${password}\nSign in at /admin/login and change it under Users.\n`);
    }
  } else {
    console.warn("ADMIN_BOOTSTRAP_EMAIL not set — no admin user created.");
  }
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
