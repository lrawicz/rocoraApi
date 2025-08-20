import { QueryRunner } from "typeorm";

export async function  dataPaymentAB10_up(queryRunner: QueryRunner): Promise<void> {
    const contractID:number = 610
    if(false)
    await queryRunner.query(`UPDATE contract SET "sheduleAmount" = 
        '[
            {"amount": 250000, "months": 3, "startDate": "2023-01-01"},
            {"amount": 275456, "months": 3, "startDate": "2025-04-01"},
            {"amount": 286000, "months": 3, "startDate": "2025-08-01"}

        ]

        '
        WHERE id = ${contractID}`)
    const payments = [
        {date:'2023-01-11',  amount:33000},
        {date:'2023-02-11',  amount:35000},

        {date:'2023-04-01',  amount:50000},
        {date:'2023-05-18',  amount:40000},
        {date:'2023-06-18',  amount:20000},
        {date:'2023-07-11',  amount:30000},
        {date:'2023-08-11',  amount:35000},{date:'2023-08-18',  amount:35000},
        {date:'2023-09-01',  amount:40000},
        {date:'2023-10-11',  amount:36000},
        {date:'2023-11-25',  amount:50000},
        {date:'2023-12-01',  amount:45000},

        {date:'2024-01-01',  amount:52000},
        {date:'2024-02-18',  amount:40000},{date:'2024-02-25',  amount:45000},

        {date:'2024-04-18',  amount:150000},
        {date:'2024-05-01',  amount:100000},{date:'2024-05-11',  amount:160000},{date:'2024-05-25',  amount:160000},
        {date:'2024-06-01',  amount:210000},
        {date:'2024-07-01',  amount:160000},

        {date:'2024-09-01',  amount:160000},
        {date:'2024-10-01',  amount:160000},
        {date:'2024-11-01',  amount:178422},
        {date:'2024-12-01',  amount:178422},
        {date:'2025-01-01',  amount:178422}
    ]
    
    await queryRunner.query(`INSERT INTO "payment"
    ("date", "amount", "contractId")
    VALUES
    ${payments.map(item=>`('${item.date}', ${item.amount}, $1)`).join(',')}
    ;

    `,[contractID])

}