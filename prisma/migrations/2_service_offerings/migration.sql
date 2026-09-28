-- Service offerings ("Our Services" grid), card summary and display-only sector names.
ALTER TABLE "services" ADD COLUMN "short" TEXT NOT NULL DEFAULT '';
ALTER TABLE "services" ADD COLUMN "offerings" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "services" ADD COLUMN "sectors" TEXT[];
