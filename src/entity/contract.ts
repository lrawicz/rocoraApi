import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm"
import { Location } from "./location"
import { Payment } from "./payment"

export type taskAmount = {
    amount: number,
    startDate: Date,
    months: number,
}
export type contractStatus = "ACTIVE" | "INACTIVE" | "CANCELLED";

@Entity()
export class Contract extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    tenant: string

    @Column({nullable: false})
    tenantDNI: number

    @Column({nullable: false})
    startDate: Date

    @Column({nullable: false})
    endDate: Date

    @Column('jsonb', { nullable: false, default: [] })
    sheduleAmount: taskAmount[];

    @Column({nullable: true, default: "ACTIVE",enum:["ACTIVE","INACTIVE","CANCELLED"] })
    status: contractStatus;

    @ManyToOne(type => Location, location => location.contracts) location: Location; 

    @OneToMany(type => Payment, payment => payment.contract, 
        ) payments: Payment[];
    

}