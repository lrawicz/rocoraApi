import { MigrationInterface, QueryRunner } from "typeorm";

export class VL15_1755474827115 implements MigrationInterface {
    contractID:number = 115

    public async up(queryRunner: QueryRunner): Promise<void> {
        if(false)
        await queryRunner.query(`UPDATE contract SET "sheduleAmount" = 
            '[
                {"amount": 250000, "months": 3, "startDate": "2023-01-01"},
                {"amount": 275456, "months": 3, "startDate": "2025-04-01"},
                {"amount": 286000, "months": 3, "startDate": "2025-08-01"}

            ]

            '
            WHERE id = ${this.contractID}`)

        await queryRunner.query(`INSERT INTO "payment"
            ("date", "amount", "contractId")
            VALUES

            ('2023-01-11',20000,$1)
            `,
        [this.contractID])

    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "payment" WHERE "contractId" = $1 AND "date"< '2025-08-17'`, [this.contractID])
    }

}
