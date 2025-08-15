import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { Location } from "./location";

@Entity()
export class Debt extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    serviceName: "AYSA"|"EDESUR"|"Metrogas"|"AGIP"|"ServGen"
    
    // @ManyToMany(() => Location, 
    //   location =>  location.debts, //optional
    //   {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    // )
    // @JoinTable({
    //   name: 'debts_locations', 
    //   joinColumn: {name: 'debt_id',referencedColumnName: 'id'},
    //   inverseJoinColumn: {name: 'location_id', referencedColumnName: 'id'},
    // })
    // locations?: Location[];

    @Column()
    debt: number

    @Column('date')
    dueDate: Date

    @Column()
    status: "PENDING"|"PAID"|"OVERPAID"

    @Column('jsonb', { nullable: false, default: [] })
    amountPaid: number

    @Column()
    totalAmountPayed: number

    @Column('jsonb', { nullable: false, default: [] })
    tickets: JSON

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
    
}