-- CMS tables for Insight Advora LLP. leads/subscribers are adopted by 0_init (already live).
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "content_status" AS ENUM ('draft', 'review', 'published', 'archived');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('admin', 'editor');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password_hash" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'editor',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_categories" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "content_status" NOT NULL DEFAULT 'published',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "og_image" TEXT,
    "is_demo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "qualification" TEXT,
    "category_id" TEXT,
    "expertise" TEXT[],
    "bio" TEXT,
    "focus" TEXT[],
    "photo" TEXT,
    "linkedin" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "content_status" NOT NULL DEFAULT 'draft',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "og_image" TEXT,
    "is_demo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "short_title" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'strategy',
    "challenge" TEXT,
    "capabilities" TEXT[],
    "flow" TEXT[],
    "challenges" TEXT[],
    "perspective" TEXT,
    "outcomes" TEXT[],
    "related" TEXT[],
    "faq" JSONB NOT NULL DEFAULT '[]',
    "status" "content_status" NOT NULL DEFAULT 'draft',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "og_image" TEXT,
    "is_demo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "industries" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "scope_note" TEXT,
    "considerations" TEXT[],
    "challenges" TEXT[],
    "topics" TEXT[],
    "status" "content_status" NOT NULL DEFAULT 'draft',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "og_image" TEXT,
    "is_demo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "industries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "industry_services" (
    "industry_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "industry_services_pkey" PRIMARY KEY ("industry_id","service_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "content_status" NOT NULL DEFAULT 'published',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "og_image" TEXT,
    "is_demo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_types" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "content_status" NOT NULL DEFAULT 'published',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "og_image" TEXT,
    "is_demo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "bio" TEXT,
    "photo" TEXT,
    "linkedin" TEXT,
    "status" "content_status" NOT NULL DEFAULT 'published',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "og_image" TEXT,
    "is_demo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "content_status" NOT NULL DEFAULT 'published',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "og_image" TEXT,
    "is_demo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "key_takeaways" TEXT[],
    "featured_image" TEXT,
    "reading_time" INTEGER NOT NULL DEFAULT 5,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "category_id" TEXT,
    "content_type_id" TEXT,
    "author_id" TEXT,
    "search_extra" TEXT NOT NULL DEFAULT '',
    "search_vector" tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce("title", '')), 'A') ||
        setweight(to_tsvector('english', coalesce("subtitle", '')), 'B') ||
        setweight(to_tsvector('english', coalesce("excerpt", '')), 'B') ||
        setweight(to_tsvector('english', coalesce("search_extra", '')), 'B') ||
        setweight(to_tsvector('english', regexp_replace(coalesce("body", ''), '<[^>]+>', ' ', 'g')), 'C')
    ) STORED,
    "status" "content_status" NOT NULL DEFAULT 'draft',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "og_image" TEXT,
    "is_demo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_industries" (
    "article_id" TEXT NOT NULL,
    "industry_id" TEXT NOT NULL,

    CONSTRAINT "article_industries_pkey" PRIMARY KEY ("article_id","industry_id")
);

-- CreateTable
CREATE TABLE "article_services" (
    "article_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "article_services_pkey" PRIMARY KEY ("article_id","service_id")
);

-- CreateTable
CREATE TABLE "article_tags" (
    "article_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "article_tags_pkey" PRIMARY KEY ("article_id","tag_id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL DEFAULT 'Guide',
    "file_url" TEXT,
    "gated" BOOLEAN NOT NULL DEFAULT true,
    "status" "content_status" NOT NULL DEFAULT 'draft',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "og_image" TEXT,
    "is_demo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "alt" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "firm_name" TEXT NOT NULL DEFAULT 'Insight Advora LLP',
    "logo" TEXT,
    "tagline" TEXT NOT NULL DEFAULT 'Partnering for Smarter Decisions',
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "office_hours" TEXT,
    "map_embed_url" TEXT,
    "linkedin" TEXT,
    "social_links" JSONB NOT NULL DEFAULT '[]',
    "footer_text" TEXT,
    "copyright_year" INTEGER NOT NULL DEFAULT 2026,
    "ga_id" TEXT,
    "gtm_id" TEXT,
    "careers_active" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_seo" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "og_image" TEXT,
    "canonical" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_seo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "team_categories_slug_key" ON "team_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_slug_key" ON "team_members"("slug");

-- CreateIndex
CREATE INDEX "team_members_status_display_order_idx" ON "team_members"("status", "display_order");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_status_display_order_idx" ON "services"("status", "display_order");

-- CreateIndex
CREATE UNIQUE INDEX "industries_slug_key" ON "industries"("slug");

-- CreateIndex
CREATE INDEX "industries_status_display_order_idx" ON "industries"("status", "display_order");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "content_types_slug_key" ON "content_types"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "authors_slug_key" ON "authors"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_status_published_at_idx" ON "articles"("status", "published_at" DESC);

-- CreateIndex
CREATE INDEX "articles_search_idx" ON "articles" USING GIN ("search_vector");

-- CreateIndex
CREATE UNIQUE INDEX "resources_slug_key" ON "resources"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "media_bucket_path_key" ON "media"("bucket", "path");

-- CreateIndex
CREATE UNIQUE INDEX "page_seo_path_key" ON "page_seo"("path");

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "team_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "industry_services" ADD CONSTRAINT "industry_services_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "industries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "industry_services" ADD CONSTRAINT "industry_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_content_type_id_fkey" FOREIGN KEY ("content_type_id") REFERENCES "content_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_industries" ADD CONSTRAINT "article_industries_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_industries" ADD CONSTRAINT "article_industries_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "industries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_services" ADD CONSTRAINT "article_services_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_services" ADD CONSTRAINT "article_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- ─── Row Level Security ────────────────────────────────────────────────────
-- Prisma connects as the table owner (bypasses RLS). These policies govern the
-- Supabase anon/authenticated roles (PostgREST): public may only SELECT
-- published content; nothing is writable through the public API.

ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON "users" FROM anon, authenticated;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['team_categories','team_members','services','industries','categories','content_types','authors','tags','articles','resources']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('REVOKE ALL ON %I FROM anon, authenticated', t);
    EXECUTE format('GRANT SELECT ON %I TO anon, authenticated', t);
    EXECUTE format('CREATE POLICY "public can read published" ON %I FOR SELECT TO anon, authenticated USING (status = ''published'')', t);
  END LOOP;

  FOREACH t IN ARRAY ARRAY['industry_services','article_industries','article_services','article_tags','site_settings','page_seo','media']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('REVOKE ALL ON %I FROM anon, authenticated', t);
    EXECUTE format('GRANT SELECT ON %I TO anon, authenticated', t);
    EXECUTE format('CREATE POLICY "public can read" ON %I FOR SELECT TO anon, authenticated USING (true)', t);
  END LOOP;
END $$;

-- Singleton settings row.
INSERT INTO "site_settings" ("id", "updated_at") VALUES (1, now()) ON CONFLICT DO NOTHING;
