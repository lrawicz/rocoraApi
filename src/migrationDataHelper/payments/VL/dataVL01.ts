import { QueryRunner } from "typeorm";

export async function  dataPaymentVL01_up(queryRunner: QueryRunner): Promise<void> {
    const contractID:number = 101
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
        {date:'2023-01-01', amount:20000},
        {date:'2023-02-01', amount:28000},
        {date:'2023-03-01', amount:30000},
        {date:'2023-04-01', amount:30000},
        {date:'2023-05-01', amount:30000},
        {date:'2023-06-01', amount:30000},
        {date:'2023-07-01', amount:30000},
        {date:'2023-08-01', amount:30000},
        {date:'2023-09-01', amount:30000},
        {date:'2023-10-01', amount:30000},
        {date:'2023-11-01', amount:30000},
        {date:'2023-12-01', amount:30000},


        {date:'2024-01-01', amount:71250},
        {date:'2024-02-01', amount:71250},
        {date:'2024-03-01', amount:75000},
        {date:'2024-04-01', amount:75000},
        {date:'2024-05-01', amount:75000},
        {date:'2024-06-01', amount:75000},
        {date:'2024-07-01', amount:71250},
        {date:'2024-08-01', amount:71250},
        {date:'2024-09-01', amount:71250},
        {date:'2024-10-01', amount:71250},
        {date:'2024-11-01', amount:71250},
        {date:'2024-12-01', amount:71250}
    ]
    
    await queryRunner.query(`INSERT INTO "payment"
    ("date", "amount", "contractId")
    VALUES
    ${payments.map(item=>`('${item.date}', ${item.amount}, $1)`).join(',')}
    ;

    `,[contractID])

}