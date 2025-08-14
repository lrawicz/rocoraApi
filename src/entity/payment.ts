import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm"
import { Contract } from "./contract";

@Entity()
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date
    
    @Column()
    amount: number

    @ManyToOne(type => Contract, contract => contract.payments) contract: Contract; 
}