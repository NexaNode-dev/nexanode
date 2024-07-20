import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1721393113528 implements MigrationInterface {
  name = 'Init1721393113528';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
            CREATE TABLE "users" (
                "id" uuid NOT NULL,
                "user_name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying,
                "access_token" character varying,
                "refresh_token" character varying,
                "login_expires" TIMESTAMP,
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
            CREATE TABLE "services" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "summary" character varying NOT NULL,
                "description" character varying,
                "price" integer,
                "category_id" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_7806a14d42c3244064b4a1706ca" UNIQUE ("name"),
                CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "service_categories" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"),
                CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
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
            CREATE TYPE "public"."events_interval_unit_enum" AS ENUM('day', 'week', 'month', 'year')
        `);
    await queryRunner.query(`
            CREATE TABLE "events" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "from" TIMESTAMP NOT NULL,
                "to" TIMESTAMP,
                "location" character varying NOT NULL,
                "units" integer NOT NULL,
                "unit_type" character varying NOT NULL,
                "unit_capacity" integer NOT NULL,
                "price" integer,
                "service_id" character varying,
                "recurring" boolean NOT NULL DEFAULT false,
                "interval" integer,
                "interval_unit" "public"."events_interval_unit_enum",
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."booking_status_enum" AS ENUM('pending', 'confirmed', 'cancelled')
        `);
    await queryRunner.query(`
            CREATE TABLE "booking" (
                "id" uuid NOT NULL,
                "reference" character varying NOT NULL,
                "event_id" character varying NOT NULL,
                "status" "public"."booking_status_enum" NOT NULL,
                "user_id" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97c7203bed6a596750e0c12e281" UNIQUE ("reference"),
                CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "booking"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."booking_status_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "events"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."events_interval_unit_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "media"
        `);
    await queryRunner.query(`
            DROP TABLE "service"
        `);
    await queryRunner.query(`
            DROP TABLE "user_roles"
        `);
    await queryRunner.query(`
            DROP TABLE "permissions"
        `);
    await queryRunner.query(`
            DROP TABLE "roles"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
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
  }
}
