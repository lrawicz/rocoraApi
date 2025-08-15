import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
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

    @Column('text',{nullable: false})
    tenant: string

    @Column('text',{nullable: false})
    tenantDNI: string

    @Column('date',{nullable: false})
    startDate: Date

    @Column('date',{nullable: false})
    endDate: Date

    @Column('jsonb', { nullable: false, default: [] })
    sheduleAmount: taskAmount[];

    @Column('enum',{nullable: true, default: "ACTIVE",enum:["ACTIVE","INACTIVE","CANCELLED"] })
    status: contractStatus;

    //relations
    @ManyToOne(type => Location, location => location.contracts) 
    location: Location; 

    @OneToMany(type => Payment, payment => payment.contract, ) 
    payments: Payment[];
    
    //updates
    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

}