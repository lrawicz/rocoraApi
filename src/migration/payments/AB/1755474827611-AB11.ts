import { MigrationInterface, QueryRunner } from "typeorm";

export class AB11_1755474827611 implements MigrationInterface {
    contractID:number = 611

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

        ('2023-01-11',  0,$1),
        ('2023-02-01',  60496,$1),('2023-02-25',  30248,$1),
        ('2023-03-11',  30248,$1),

        ('2023-06-18',  30000,$1),
        ('2023-07-11',  30000,$1),
        ('2023-08-25',  60000,$1),

        ('2023-10-25',  182000,$1),
        ('2023-12-18',  60000,$1),


        ('2024-02-25',  50000,$1),

        ('2024-04-18',  190000,$1),
        ('2024-05-25',  130000,$1),
        ('2024-06-25',  120000,$1),
        ('2024-07-25',  120000,$1),
        ('2024-08-18',  150000,$1),

        ('2024-10-25',  150000,$1),
        ('2024-11-18',  150000,$1),
        ('2024-12-25',  140000,$1),
        
        ('2025-01-25',  150000,$1),


        ;

        `,[this.contractID])


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "payment" WHERE "contractId" = $1  AND "date"< '2025-08-17'`, [this.contractID])
    }

}
