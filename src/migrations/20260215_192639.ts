import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "portfolio"."enum_projects_case_study_mode" AS ENUM('full', 'short');
  CREATE TYPE "portfolio"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TABLE "portfolio"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "portfolio"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "portfolio"."categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"order" numeric DEFAULT 0,
  	"color_token" varchar,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "portfolio"."projects_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "portfolio"."projects_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "portfolio"."projects_blocks_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio"."projects_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio"."projects_blocks_video_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio"."projects_blocks_stats_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "portfolio"."projects_blocks_stats_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio"."projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"content" varchar,
  	"case_study_mode" "portfolio"."enum_projects_case_study_mode" DEFAULT 'short' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"featured_order" numeric,
  	"year" numeric,
  	"client" varchar,
  	"role" varchar,
  	"featured_image_id" integer,
  	"links_live_url" varchar,
  	"links_repo_url" varchar,
  	"status" "portfolio"."enum_projects_status" DEFAULT 'draft' NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio"."projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "portfolio"."leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"source_path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "portfolio"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"categories_id" integer,
  	"media_id" integer,
  	"projects_id" integer,
  	"leads_id" integer
  );
  
  CREATE TABLE "portfolio"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "portfolio"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "portfolio"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "portfolio"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_stack" ADD CONSTRAINT "projects_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_metrics" ADD CONSTRAINT "projects_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_blocks_text_block" ADD CONSTRAINT "projects_blocks_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_blocks_image_block" ADD CONSTRAINT "projects_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "portfolio"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_blocks_image_block" ADD CONSTRAINT "projects_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_blocks_video_block" ADD CONSTRAINT "projects_blocks_video_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_blocks_stats_block_items" ADD CONSTRAINT "projects_blocks_stats_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "portfolio"."projects_blocks_stats_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_blocks_stats_block" ADD CONSTRAINT "projects_blocks_stats_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."projects" ADD CONSTRAINT "projects_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "portfolio"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio"."projects" ADD CONSTRAINT "projects_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "portfolio"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_rels" ADD CONSTRAINT "projects_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "portfolio"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "portfolio"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "portfolio"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "portfolio"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "portfolio"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "portfolio"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "portfolio"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "portfolio"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "portfolio"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "portfolio"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "portfolio"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "portfolio"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "portfolio"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "portfolio"."users" USING btree ("email");
  CREATE INDEX "categories_name_idx" ON "portfolio"."categories" USING btree ("name");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "portfolio"."categories" USING btree ("slug");
  CREATE INDEX "categories_active_idx" ON "portfolio"."categories" USING btree ("active");
  CREATE INDEX "categories_updated_at_idx" ON "portfolio"."categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "portfolio"."categories" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "portfolio"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "portfolio"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "portfolio"."media" USING btree ("filename");
  CREATE INDEX "projects_stack_order_idx" ON "portfolio"."projects_stack" USING btree ("_order");
  CREATE INDEX "projects_stack_parent_id_idx" ON "portfolio"."projects_stack" USING btree ("_parent_id");
  CREATE INDEX "projects_metrics_order_idx" ON "portfolio"."projects_metrics" USING btree ("_order");
  CREATE INDEX "projects_metrics_parent_id_idx" ON "portfolio"."projects_metrics" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_block_order_idx" ON "portfolio"."projects_blocks_text_block" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_block_parent_id_idx" ON "portfolio"."projects_blocks_text_block" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_block_path_idx" ON "portfolio"."projects_blocks_text_block" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_block_order_idx" ON "portfolio"."projects_blocks_image_block" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_block_parent_id_idx" ON "portfolio"."projects_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_block_path_idx" ON "portfolio"."projects_blocks_image_block" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_block_image_idx" ON "portfolio"."projects_blocks_image_block" USING btree ("image_id");
  CREATE INDEX "projects_blocks_video_block_order_idx" ON "portfolio"."projects_blocks_video_block" USING btree ("_order");
  CREATE INDEX "projects_blocks_video_block_parent_id_idx" ON "portfolio"."projects_blocks_video_block" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_video_block_path_idx" ON "portfolio"."projects_blocks_video_block" USING btree ("_path");
  CREATE INDEX "projects_blocks_stats_block_items_order_idx" ON "portfolio"."projects_blocks_stats_block_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_block_items_parent_id_idx" ON "portfolio"."projects_blocks_stats_block_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_block_order_idx" ON "portfolio"."projects_blocks_stats_block" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_block_parent_id_idx" ON "portfolio"."projects_blocks_stats_block" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_block_path_idx" ON "portfolio"."projects_blocks_stats_block" USING btree ("_path");
  CREATE INDEX "projects_title_idx" ON "portfolio"."projects" USING btree ("title");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "portfolio"."projects" USING btree ("slug");
  CREATE INDEX "projects_case_study_mode_idx" ON "portfolio"."projects" USING btree ("case_study_mode");
  CREATE INDEX "projects_featured_idx" ON "portfolio"."projects" USING btree ("featured");
  CREATE INDEX "projects_year_idx" ON "portfolio"."projects" USING btree ("year");
  CREATE INDEX "projects_featured_image_idx" ON "portfolio"."projects" USING btree ("featured_image_id");
  CREATE INDEX "projects_status_idx" ON "portfolio"."projects" USING btree ("status");
  CREATE INDEX "projects_seo_seo_og_image_idx" ON "portfolio"."projects" USING btree ("seo_og_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "portfolio"."projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "portfolio"."projects" USING btree ("created_at");
  CREATE INDEX "projects_rels_order_idx" ON "portfolio"."projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "portfolio"."projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "portfolio"."projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_categories_id_idx" ON "portfolio"."projects_rels" USING btree ("categories_id");
  CREATE INDEX "projects_rels_media_id_idx" ON "portfolio"."projects_rels" USING btree ("media_id");
  CREATE INDEX "leads_email_idx" ON "portfolio"."leads" USING btree ("email");
  CREATE INDEX "leads_updated_at_idx" ON "portfolio"."leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "portfolio"."leads" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "portfolio"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "portfolio"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "portfolio"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "portfolio"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "portfolio"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "portfolio"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "portfolio"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "portfolio"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "portfolio"."payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "portfolio"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "portfolio"."payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "portfolio"."payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_preferences_key_idx" ON "portfolio"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "portfolio"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "portfolio"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "portfolio"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "portfolio"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "portfolio"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "portfolio"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "portfolio"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "portfolio"."payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "portfolio"."users_sessions" CASCADE;
  DROP TABLE "portfolio"."users" CASCADE;
  DROP TABLE "portfolio"."categories" CASCADE;
  DROP TABLE "portfolio"."media" CASCADE;
  DROP TABLE "portfolio"."projects_stack" CASCADE;
  DROP TABLE "portfolio"."projects_metrics" CASCADE;
  DROP TABLE "portfolio"."projects_blocks_text_block" CASCADE;
  DROP TABLE "portfolio"."projects_blocks_image_block" CASCADE;
  DROP TABLE "portfolio"."projects_blocks_video_block" CASCADE;
  DROP TABLE "portfolio"."projects_blocks_stats_block_items" CASCADE;
  DROP TABLE "portfolio"."projects_blocks_stats_block" CASCADE;
  DROP TABLE "portfolio"."projects" CASCADE;
  DROP TABLE "portfolio"."projects_rels" CASCADE;
  DROP TABLE "portfolio"."leads" CASCADE;
  DROP TABLE "portfolio"."payload_kv" CASCADE;
  DROP TABLE "portfolio"."payload_locked_documents" CASCADE;
  DROP TABLE "portfolio"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "portfolio"."payload_preferences" CASCADE;
  DROP TABLE "portfolio"."payload_preferences_rels" CASCADE;
  DROP TABLE "portfolio"."payload_migrations" CASCADE;
  DROP TYPE "portfolio"."enum_projects_case_study_mode";
  DROP TYPE "portfolio"."enum_projects_status";`)
}
