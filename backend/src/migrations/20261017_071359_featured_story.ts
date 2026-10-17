import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" ADD COLUMN "featured_story_enabled" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "featured_story_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "featured_story_heading_highlight" varchar;
  ALTER TABLE "home_page" ADD COLUMN "featured_story_intro" varchar;
  ALTER TABLE "home_page" ADD COLUMN "featured_story_excerpt" jsonb;
  ALTER TABLE "home_page" ADD COLUMN "featured_story_story" jsonb;
  ALTER TABLE "home_page" ADD COLUMN "featured_story_read_more_label" varchar DEFAULT 'पूरा पढ़ें';
  ALTER TABLE "home_page" ADD COLUMN "featured_story_video_url" varchar;
  ALTER TABLE "home_page" ADD COLUMN "featured_story_video_title" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" DROP COLUMN "featured_story_enabled";
  ALTER TABLE "home_page" DROP COLUMN "featured_story_heading";
  ALTER TABLE "home_page" DROP COLUMN "featured_story_heading_highlight";
  ALTER TABLE "home_page" DROP COLUMN "featured_story_intro";
  ALTER TABLE "home_page" DROP COLUMN "featured_story_excerpt";
  ALTER TABLE "home_page" DROP COLUMN "featured_story_story";
  ALTER TABLE "home_page" DROP COLUMN "featured_story_read_more_label";
  ALTER TABLE "home_page" DROP COLUMN "featured_story_video_url";
  ALTER TABLE "home_page" DROP COLUMN "featured_story_video_title";`)
}
