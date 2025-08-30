import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { Contract } from "./contract";

@Entity()
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('date',{nullable: false})
    date!: Date
    
    @Column('float',{nullable: false})
    amount!: number

    @Column({type:"enum", enum:["efectivo","transferencia"],default:"efectivo"})
    type!:"efectivo"|"transferencia"
    //relations
    @ManyToOne(type => Contract, contract => contract.payments) contract!: Contract; 

    //updates
    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
    
}