import { MigrationInterface, QueryRunner } from "typeorm";

export class VL01_1755474827101 implements MigrationInterface {
    contractID:number = 101

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

            ('2023-01-01', 20000,$1),
            ('2023-02-01', 28000,$1),
        ('2023-03-01', 30000,$1),
        ('2023-04-01', 30000,$1),
        ('2023-05-01', 30000,$1),
        ('2023-06-01', 30000,$1),
        ('2023-07-01', 30000,$1),
        ('2023-08-01', 30000,$1),
        ('2023-09-01', 30000,$1),
        ('2023-10-01', 30000,$1),
        ('2023-11-01', 30000,$1),
        ('2023-12-01', 30000,$1),


        ('2024-01-01', 71250,$1),
        ('2024-02-01', 71250,$1),
        ('2024-03-01', 75000,$1),
        ('2024-04-01', 75000,$1),
        ('2024-05-01', 75000,$1),
        ('2024-06-01', 75000,$1),
        ('2024-07-01', 71250,$1),
        ('2024-08-01', 71250,$1),
        ('2024-09-01', 71250,$1),
        ('2024-10-01', 71250,$1),
        ('2024-11-01', 71250,$1),
        ('2024-12-01', 71250,$1),


        ;

        `,[this.contractID])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "payment" WHERE "contractId" = $1 AND "date"< '2025-08-17'`, [this.contractID])
    }

}
