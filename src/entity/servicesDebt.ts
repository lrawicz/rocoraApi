import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
import { Location } from "./location";

@Entity()
export class ServiceDebts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('enum',{enum:["AYSA","EDESUR","Metrogas","AGIP","ServGen"]})
    serviceName: "AYSA"|"EDESUR"|"Metrogas"|"AGIP"|"ServGen"

    @Column('float')
    debt: number

    @Column('date')
    primerVencimiento: Date

    @Column('date')
    segundoVencimiento: Date

    @ManyToOne(type => Location, location => location.servicesDebts) 
    location: Location

    @Column('enum', { enum: ["PENDING", "PAID", "OVERPAID"] })
    status: "PENDING"|"PAID"|"OVERPAID"

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
    
}