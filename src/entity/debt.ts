import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Location } from "./location";

@Entity()
export class Debt extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    serviceName: "AYSA"|"EDESUR"|"EPEC"|"Metrogas"|"Telecom"|"Otro"
    
    @ManyToMany(() => Location, 
      location =>  location.debts, //optional
      {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    )
    @JoinTable({
      name: 'debts_locations', 
      joinColumn: {
        name: 'debt_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'location_name',
        referencedColumnName: 'name',
      },
    })
    locations?: Location[];

    @Column()
    amount: number

    @Column()
    dueDate: Date

    @Column()
    status: "PENDING"|"PAID"|"OVERDUE"

    @Column()
    amountPaid: number

    @Column()
    paymentDate: Date

}