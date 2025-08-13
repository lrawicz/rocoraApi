import { Entity, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany } from "typeorm"
import { Building } from "./building"
import { Contract } from "./contract";
import { Debt } from "./debt";

@Entity()
export class Location extends BaseEntity {
    @Column({ primary: true, type: "varchar",unique: true })
    name: string

    @ManyToOne(type => Building, building => building.locations) building: Building; 

    @OneToMany(type => Contract, contract => contract.location) contracts: Contract[];  
    
    @ManyToMany(
    () => Debt,
    debt => debt.locations,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
  )
  debts?: Debt[];

  @Column()
  status: string
}
