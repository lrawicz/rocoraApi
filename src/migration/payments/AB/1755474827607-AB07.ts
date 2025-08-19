import { MigrationInterface, QueryRunner } from "typeorm";

export class AB07_1755474827607 implements MigrationInterface {
    contractID:number = 607

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

        ('2023-01-11',  30000,$1),
        ('2023-02-11',  30000,$1),
        ('2023-03-01',  30000,$1),
        ('2023-04-11',  30000,$1),
        ('2023-05-01',  30000,$1),
        ('2023-06-11',  30000,$1),
        ('2023-07-11',  60000,$1),
        ('2023-08-11',  60000,$1),
        ('2023-09-11',  60000,$1),
        ('2023-10-11',  60000,$1),
        ('2023-12-11',  60000,$1),

        ('2024-01-11',  60000,$1),
        ('2024-02-11',  60000,$1),
        ('2024-03-11',  60000,$1),
        ('2024-04-11',  60000,$1),
        ('2024-05-11',  60000,$1),
        ('2024-06-11',  60000,$1),
        ('2024-07-11',  206000,$1),
        ('2024-08-11',  206637,$1),
        ('2024-09-11',  206000,$1),
        ('2024-10-11',  206000,$1),
        ('2024-11-11',  206637,$1),
        ('2024-12-11',  206000,$1),


        ('2025-01-11',  206000,$1),
        ('2025-02-11',  206000,$1),
        ('2025-03-18',  206000,$1),
        ('2025-04-11',  206000,$1),
        ('2025-05-18',  150000,$1),
        ('2025-06-01',  206000,$1),
        ('2025-07-11',  600000,$1),('2025-07-18',  100000,$1),
        ('2025-08-11',  300000,$1)
        ;

        `,[this.contractID])

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "payment" WHERE "contractId" = $1  AND "date"< '2025-08-17'`, [this.contractID])
    }

}
