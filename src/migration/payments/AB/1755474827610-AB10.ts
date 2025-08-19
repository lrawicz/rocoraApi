import { MigrationInterface, QueryRunner } from "typeorm";

export class AB10_1755474827610 implements MigrationInterface {
    contractID:number = 610

    // mayo Elisa maria rodriguez
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

        ('2023-01-11',  33000,$1),
        ('2023-02-11',  35000,$1),

        ('2023-04-01',  50000,$1),
        ('2023-05-18',  40000,$1),
        ('2023-06-18',  20000,$1),
        ('2023-07-11',  30000,$1),
        ('2023-08-11',  35000,$1),('2023-08-18',  35000,$1),
        ('2023-09-01',  40000,$1),
        ('2023-10-11',  36000,$1),
        ('2023-11-25',  50000,$1),
        ('2023-12-01',  45000,$1),

        ('2024-01-01',  52000,$1),
        ('2024-02-18',  40000,$1),('2024-02-25',  45000,$1),

        ('2024-04-18',  150000,$1),
        ('2024-05-01',  100000,$1),('2024-05-11',  160000,$1),('2024-05-25',  160000,$1),
        ('2024-06-01',  210000,$1),
        ('2024-07-01',  160000,$1),

        ('2024-09-01',  160000,$1),
        ('2024-10-01',  160000,$1),
        ('2024-11-01',  178422,$1),
        ('2024-12-01',  178422,$1),


        ('2025-01-01',  178422,$1),


        ;

        `,[this.contractID])

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "payment" WHERE "contractId" = $1  AND "date"< '2025-08-17'`, [this.contractID])
    }

}
