import { QueryRunner } from "typeorm";

export async function  dataPaymentVL10_up(queryRunner: QueryRunner): Promise<void> {
    const contractID:number = 110
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
            {date:'2023-01-01', amount:35000},{date:'2023-01-11', amount:50000},
            {date:'2023-02-11', amount:17500}   
    ]
    
    await queryRunner.query(`INSERT INTO "payment"
    ("date", "amount", "contractId")
    VALUES
    ${payments.map(item=>`('${item.date}', ${item.amount}, $1)`).join(',')}
    ;

    `,[contractID])

}