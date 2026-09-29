-- Admin-editable homepage content on the site_settings singleton.
ALTER TABLE "site_settings" ADD COLUMN "meeting_video_url" TEXT;
ALTER TABLE "site_settings" ADD COLUMN "meeting_video_poster" TEXT;
ALTER TABLE "site_settings" ADD COLUMN "watermark_url" TEXT;
ALTER TABLE "site_settings" ADD COLUMN "hero_phrase" TEXT[];
ALTER TABLE "site_settings" ADD COLUMN "about_paragraphs" TEXT[];
ALTER TABLE "site_settings" ADD COLUMN "about_pillars" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "site_settings" ADD COLUMN "cta_heading" TEXT;
ALTER TABLE "site_settings" ADD COLUMN "cta_body" TEXT;
ALTER TABLE "site_settings" ADD COLUMN "cta_button" TEXT;
