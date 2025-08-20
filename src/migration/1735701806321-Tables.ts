import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1735701806321 implements MigrationInterface {
    name = 'Tables1735701806321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "building" ("id" SERIAL NOT NULL, "direction" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_8f022c60eed1e3041c7e3ada7a0" UNIQUE ("direction"), CONSTRAINT "PK_bbfaf6c11f141a22d2ab105ee5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payment_type_enum" AS ENUM('efectivo', 'transferencia')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "date" date NOT NULL, "amount" double precision NOT NULL, "type" "public"."payment_type_enum" NOT NULL DEFAULT 'efectivo', "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "contractId" integer, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."contract_status_enum" AS ENUM('ACTIVO', 'VENCIDO', 'JUICIO')`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" SERIAL NOT NULL, "tenant" text NOT NULL, "tenantDNI" text NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "sheduleAmount" jsonb NOT NULL DEFAULT '[]', "status" "public"."contract_status_enum" DEFAULT 'ACTIVO', "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "locationId" integer, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."location_status_enum" AS ENUM('ALQUILADO', 'OFICINA', 'EN_REPARACIóN', 'A_LA_VENTA', 'DISPONIBLE_PARA_ALQUILAR', 'DEPOSITO')`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "name" text NOT NULL, "status" "public"."location_status_enum" NOT NULL DEFAULT 'ALQUILADO', "additionalInfo" text, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "buildingId" integer, CONSTRAINT "UQ_f0336eb8ccdf8306e270d400cf0" UNIQUE ("name"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."service_debts_servicename_enum" AS ENUM('AYSA', 'EDESUR', 'Metrogas', 'AGIP', 'ServGen')`);
        await queryRunner.query(`CREATE TYPE "public"."service_debts_acargode_enum" AS ENUM('dueño', 'inquilino')`);
        await queryRunner.query(`CREATE TYPE "public"."service_debts_status_enum" AS ENUM('PENDING', 'PAID', 'OVERPAID')`);
        await queryRunner.query(`CREATE TABLE "service_debts" ("id" SERIAL NOT NULL, "serviceName" "public"."service_debts_servicename_enum" NOT NULL, "debt" double precision NOT NULL, "primerVencimiento" date NOT NULL, "segundoVencimiento" date NOT NULL, "acargoDe" "public"."service_debts_acargode_enum" NOT NULL, "status" "public"."service_debts_status_enum" NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "locationId" integer, CONSTRAINT "PK_7900300496f8f54562a56c8b5b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "debt" ("id" SERIAL NOT NULL, "serviceName" character varying NOT NULL, "debt" integer NOT NULL, "dueDate" date NOT NULL, "status" character varying NOT NULL, "amountPaid" jsonb NOT NULL DEFAULT '[]', "totalAmountPayed" integer NOT NULL, "tickets" jsonb NOT NULL DEFAULT '[]', "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_f0904ec85a9c8792dded33608a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_c1df8de04d7066a79ba54031aec" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_f72e315dc769c10c25563e0cd5e" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_9d3c879ab8834dc2d6c46bb3665" FOREIGN KEY ("buildingId") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_debts" ADD CONSTRAINT "FK_b89609808f819d6c287b5bde134" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_debts" DROP CONSTRAINT "FK_b89609808f819d6c287b5bde134"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_9d3c879ab8834dc2d6c46bb3665"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_f72e315dc769c10c25563e0cd5e"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_c1df8de04d7066a79ba54031aec"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "debt"`);
        await queryRunner.query(`DROP TABLE "service_debts"`);
        await queryRunner.query(`DROP TYPE "public"."service_debts_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."service_debts_acargode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."service_debts_servicename_enum"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TYPE "public"."location_status_enum"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TYPE "public"."contract_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_type_enum"`);
        await queryRunner.query(`DROP TABLE "building"`);
    }

}
