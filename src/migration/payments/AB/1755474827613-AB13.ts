import { MigrationInterface, QueryRunner } from "typeorm";

export class AB13_1755474827613 implements MigrationInterface {
    contractID:number = 613

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

        ('2023-01-11',  22000,$1),
        ('2023-02-11',  22000,$1),
        ('2023-03-11',  22000,$1),
        ('2023-04-11',  41703,$1),
        ('2023-05-18',  37000,$1),
        ('2023-06-18',  40000,$1),
        ('2023-07-18',  40000,$1),
        ('2023-08-11',  40000,$1),
        ('2023-09-11',  40000,$1),
        ('2023-10-11',  45000,$1),
        ('2023-11-25',  45000,$1),


        ('2024-01-01',  40000,$1),('2024-01-11',  30000,$1),

        ('2024-03-11',  50000,$1),('2024-03-18',  50000,$1),
        
        ('2024-05-11',  120000,$1),
        ('2024-06-18',  110000,$1),

        ('2024-08-01',  200000,$1),
        ('2024-09-01',  200000,$1),


        ('2024-12-11',  98000,$1),('2024-12-18',  200000,$1),


        ('2025-01-11',  200000,$1),('2025-01-01',  150000,$1),


        ;

        `,[this.contractID])

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "payment" WHERE "contractId" = $1  AND "date"< '2025-08-17'`, [this.contractID])
    }

}
