import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1720714311742 implements MigrationInterface {
  name = 'Init1720714311742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL,
                "user_name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying,
                "access_token" character varying,
                "refresh_token" character varying,
                "login_expires" TIMESTAMP NOT NULL,
                "is_active" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"),
                CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user_roles" (
                "id" uuid NOT NULL,
                "user_id" character varying NOT NULL,
                "role_id" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "role_permissions" (
                "id" uuid NOT NULL,
                "role_id" uuid NOT NULL,
                "permission_id" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_84059017c90bfcb701b8fa42297" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id")
        `);
    await queryRunner.query(`
            CREATE TABLE "permissions" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "action" character varying NOT NULL,
                "subject" character varying NOT NULL,
                "conditions" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"),
                CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "media" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "original_name" character varying NOT NULL,
                "type" jsonb NOT NULL,
                "storage_type" jsonb NOT NULL,
                "metadata" jsonb NOT NULL,
                "url" character varying NOT NULL,
                "user_id" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "organisations" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "type_id" uuid NOT NULL,
                "registration_number" character varying,
                "email" character varying,
                "phone" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_033784b1ceef587c675e0bf93e" UNIQUE ("type_id"),
                CONSTRAINT "PK_7bf54cba378d5b2f1d4c10ef4df" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "organisation_types" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_5890f04ca3266b124fc459671de" UNIQUE ("name"),
                CONSTRAINT "PK_ec400c0a7fceca740ca495f1186" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."job_offers_employment_type_enum" AS ENUM(
                'permanent',
                'contract',
                'temporary',
                'internship'
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."job_offers_work_time_enum" AS ENUM('full-time', 'part-time')
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."job_offers_job_level_enum" AS ENUM('junior', 'medior', 'senior', 'principal')
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."job_offers_status_enum" AS ENUM('open', 'closed')
        `);
    await queryRunner.query(`
            CREATE TABLE "job_offers" (
                "id" uuid NOT NULL,
                "company_id" uuid NOT NULL,
                "title" character varying NOT NULL,
                "description" text NOT NULL,
                "location" character varying NOT NULL,
                "salary_low" double precision NOT NULL,
                "salary_high" double precision,
                "employment_type" "public"."job_offers_employment_type_enum" NOT NULL,
                "work_time" "public"."job_offers_work_time_enum" NOT NULL,
                "contract_duration" character varying,
                "hours_per_week" integer,
                "benefits" text,
                "job_level" "public"."job_offers_job_level_enum" NOT NULL,
                "status" "public"."job_offers_status_enum" NOT NULL,
                "requirements" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9a54d36bd6829979f945defdeb5" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "organisations"
            ADD CONSTRAINT "FK_033784b1ceef587c675e0bf93ee" FOREIGN KEY ("type_id") REFERENCES "organisation_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "organisations" DROP CONSTRAINT "FK_033784b1ceef587c675e0bf93ee"
        `);
    await queryRunner.query(`
            DROP TABLE "job_offers"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."job_offers_status_enum"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."job_offers_job_level_enum"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."job_offers_work_time_enum"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."job_offers_employment_type_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "organisation_types"
        `);
    await queryRunner.query(`
            DROP TABLE "organisations"
        `);
    await queryRunner.query(`
            DROP TABLE "media"
        `);
    await queryRunner.query(`
            DROP TABLE "permissions"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_17022daf3f885f7d35423e9971"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_178199805b901ccd220ab7740e"
        `);
    await queryRunner.query(`
            DROP TABLE "role_permissions"
        `);
    await queryRunner.query(`
            DROP TABLE "user_roles"
        `);
    await queryRunner.query(`
            DROP TABLE "roles"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
