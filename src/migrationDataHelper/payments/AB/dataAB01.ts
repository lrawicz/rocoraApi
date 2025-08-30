import { QueryRunner } from "typeorm";



export async function dataPaymentAB01_up(queryRunner: QueryRunner){
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
        const payments:{date:string, amount:number}[]=[
            {date:'2023-01-05', amount:25000},
            {date:'2023-02-14', amount:25000},
            {date:'2023-03-20', amount:25000},
            {date:'2023-03-20', amount:25000},
            {date:'2023-04-14', amount:47390},
            {date:'2023-05-05', amount:47390},
            {date:'2023-06-14', amount:47390},
            {date:'2023-07-14', amount:47390},
            {date:'2023-08-05', amount:47390},
            {date:'2023-09-14', amount:47390},
            {date:'2023-10-14', amount:37940},
            {date:'2023-11-14', amount:37940},
            {date:'2023-12-14', amount:26000}, {date:'2023-12-20',amount:25390},
            {date:'2024-01-05', amount:47400}, {date:'2024-01-14',amount:16020},
            {date:'2024-02-14', amount:35000}, {date:'2024-02-20',amount:12390},{date:'2024-02-05',amount:12900},
            {date:'2024-03-20',amount:473690},
            {date:'2024-04-20',amount:142850},
            {date:'2024-05-26',amount:142854},
            {date:'2024-06-20',amount:100000}, {date:'2024-06-25',amount:42855},
            {date:'2024-07-26',amount:142857},
            {date:'2024-08-20',amount:142857},
            {date:'2024-09-20',amount:142857},
            {date:'2024-10-20',amount:142857},
            {date:'2024-11-20',amount:143000},
            {date:'2024-12-20',amount:140000},
    
            {date:'2025-01-20',amount:142857},
            {date:'2025-02-25',amount:142857},
            {date:'2025-03-20',amount:142000},
            {date:'2025-04-20',amount:149000}, {date:'2025-04-25',amount:197500},
            {date:'2025-05-14',amount:200000}, {date:'2025-05-20',amount:99050},
            {date:'2025-06-26',amount:341000},
            {date:'2025-07-14',amount:300000}, {date:'2025-07-20',amount:31600}
        ] as  const

        await queryRunner.query(`INSERT INTO "payment"
        ("date", "amount", "contractId")
        VALUES
        ${payments.map(item=>`('${item.date}', ${item.amount}, $1)`).join(',')}
        `,[contractId])

}