import { MigrationInterface, QueryRunner } from "typeorm";

export class MinorChanges1755804640185 implements MigrationInterface {
    name = 'MinorChanges1755804640185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ADD "escribanoPublico" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "escribanoPublico"`);
    }

}
