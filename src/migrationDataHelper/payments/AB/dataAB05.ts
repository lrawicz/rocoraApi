import { QueryRunner } from "typeorm";

export async function  dataPaymentAB05_up(queryRunner: QueryRunner): Promise<void> {
    const contractID:number = 605
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
        {date:'2023-03-01',  amount:35000},
        {date:'2023-04-18',  amount:35000},
        {date:'2023-05-25',  amount:35000},
        {date:'2023-06-18',  amount:35000},
        {date:'2023-07-18',  amount:50000},
        {date:'2023-09-18',  amount:50000},
        {date:'2023-10-11',  amount:50000}
        
    ]
    await queryRunner.query(`INSERT INTO "payment"
    ("date", "amount", "contractId")
    VALUES
    ${payments.map(item=>`('${item.date}', ${item.amount}, $1)`).join(',')}
    ;

    `,[contractID])

}