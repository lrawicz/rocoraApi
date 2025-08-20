import { MigrationInterface, QueryRunner } from "typeorm";


export async function dataPaymentAB02_up(queryRunner: QueryRunner){
    const contractId = 602
        if(false)
        await queryRunner.query(`UPDATE contract SET "sheduleAmount" = 
            '[
                {"amount": 250000, "months": 3, "startDate": "2023-01-01"},
                {"amount": 275456, "months": 3, "startDate": "2025-04-01"},
                {"amount": 286000, "months": 3, "startDate": "2025-08-01"}

            ]

            '
            WHERE id = ${contractId}`)
        const payments = [
        {date:'2023-01-11',  amount:22692},
        {date:'2023-02-18',  amount:22700},
        {date:'2023-03-11',  amount:42200},
        {date:'2023-04-18',  amount:42179},{date:'2023-04-25', amount:13000},
        {date:'2023-05-25',  amount:42179},
        {date:'2023-06-11',  amount:48700},
        {date:'2023-07-11',  amount:42180},
        {date:'2023-08-18',  amount:18000},
        {date:'2023-09-01',  amount:55000},{date:'2023-09-18', amount:11000},
        {date:'2023-10-18',  amount:42200},
        {date:'2023-11-11',  amount:42200},
        {date:'2023-12-11',  amount:42000},

        {date:'2024-01-11',  amount:42200},{date:'2024-01-18', amount:12019},
        {date:'2024-02-18',  amount:50000},{date:'2024-02-25', amount:54231},
        {date:'2024-03-18',  amount:104231},
        {date:'2024-04-18',  amount:104230},
        {date:'2024-05-18',  amount:104231},
        {date:'2024-06-25',  amount:150000},
        {date:'2024-07-11',  amount:150000},
        {date:'2024-08-11',  amount:150000},{date:'2023-08-25', amount:30422},
        {date:'2024-09-18',  amount:150000},
        {date:'2024-10-18',  amount:100000},
        {date:'2024-11-01',  amount:230000},
        {date:'2024-12-18',  amount:190000},

        {date:'2025-01-25',  amount:100000},
        {date:'2025-02-01',  amount:120000},{date:'2025-02-18',  amount:210000},{date:'2025-02-25',  amount:38300},
        {date:'2025-03-18',  amount:200000},
        {date:'2025-04-18',  amount:240000},
        {date:'2025-05-18',  amount:200000},
        {date:'2025-06-01',  amount:220000},{date:'2025-06-01',  amount:160000},
        {date:'2025-07-01',  amount:271400},
        {date:'2025-08-01',  amount:250000}]

        await queryRunner.query(`INSERT INTO "payment"
        ("date", "amount", "contractId")
        VALUES
        ${payments.map(item=>`('${item.date}', ${item.amount}, $1)`).join(',')}
        ;

        `,[contractId])

}
