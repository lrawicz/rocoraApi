import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm"
import { Location } from "./location"
import { Payment } from "./payment"

@Entity()
export class Contract extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tenant: string

    @Column()
    tenantDNI: number

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column('jsonb', { nullable: false, default: {} })
    amount: string;
    @ManyToOne(type => Location, location => location.contracts) location: Location; 
 
    @OneToMany(type => Payment, payment => payment.contract, 
        ) payments: Payment[];
    
    @Column()
    status: string
}