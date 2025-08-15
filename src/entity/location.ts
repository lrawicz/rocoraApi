import { Entity, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { Building } from "./building"
import { Contract } from "./contract";
import { ServiceDebts } from "./servicesDebt";

export type locationStatus ="ACTIVE"|"INACTIVE"|
          "MAINTENANCE"|"CLOSED"| "RENOVATION"| 
          "FOR_SALE" | "FOR_RENT" | "SOLD" |  "RENTED"
@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text", unique: true })
  name: string

  @Column({ type: "enum", enum: ["ACTIVE", "INACTIVE", "MAINTENANCE", "CLOSED", "RENOVATION", "FOR_SALE", "FOR_RENT", "SOLD", "RENTED"], default: "ACTIVE" })
  status: locationStatus

  @Column({ type: "text", nullable: true, default: null })
  additionalInfo: string;


  // relations
  @ManyToOne(type => Building, building => building.locations)
  building: Building; 

  @OneToMany(type => Contract, contract => contract.location)
  contracts: Contract[];  

  @OneToMany(type => Location, location => location.building, ) 
  servicesDebts: ServiceDebts[];  

  // updates
  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
  
}
