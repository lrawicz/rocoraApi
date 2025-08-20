import { QueryRunner } from "typeorm";

export async function  dataPaymentAB04_up(queryRunner: QueryRunner): Promise<void> {
    const contractID:number = 604
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
        {date:'2023-06-11',  amount:30000},
        {date:'2023-07-11',  amount:30000}, /*revisar*/
        {date:'2023-08-11',  amount:30000},
        {date:'2023-09-11',  amount:30000}, /*revisar*/
        {date:'2023-10-18',  amount:30000},
        {date:'2023-11-11',  amount:30000},
        {date:'2023-12-11',  amount:30000}, /*revisar*/

        {date:'2024-01-11',  amount:30000}, /*revisar*/
        {date:'2024-02-11',  amount:30000}, /*revisar*/
        {date:'2024-03-11',  amount:30000}, /*revisar*/
        {date:'2024-04-11',  amount:30000}, /*revisar*/
        {date:'2024-05-11',  amount:30000}, /*revisar*/
        {date:'2024-06-11',  amount:30000}, /*revisar*/
        {date:'2024-07-11',  amount:30000}, /*revisar*/
        {date:'2024-08-11',  amount:30000}, /*revisar*/
        {date:'2024-09-11',  amount:30000}, /*revisar*/
        {date:'2024-10-11',  amount:30000}, /*revisar*/
        {date:'2024-11-11',  amount:30000}, /*revisar*/
        {date:'2024-12-11',  amount:30000}, /*revisar*/

        {date:'2025-01-11',  amount:30000} /*revisar*/
    ]
    await queryRunner.query(`INSERT INTO "payment"
    ("date", "amount", "contractId")
    VALUES
    ${payments.map(item=>`('${item.date}', ${item.amount}, $1)`).join(',')}
    ;

    `,[contractID])

}