import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1729328005057 implements MigrationInterface {
    name = 'Generate1729328005057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rule_master" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "condition" character varying NOT NULL, "action" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "deleted_at" TIMESTAMP, "created_by" integer NOT NULL DEFAULT '0', "updated_by" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('UTC', now()), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('UTC', now()), CONSTRAINT "PK_50b3f9b7e3a70340a9279a9efba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaign_master" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL, "clicks" integer NOT NULL, "impressions" integer NOT NULL, "cost" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "deleted_at" TIMESTAMP, "created_by" integer NOT NULL DEFAULT '0', "updated_by" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('UTC', now()), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('UTC', now()), CONSTRAINT "PK_2b2973af0fde67f905038d182e1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "campaign_master"`);
        await queryRunner.query(`DROP TABLE "rule_master"`);
    }

}
