import { Entity, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { Building } from "./building"
import { Contract } from "./contract";
import { ServiceDebts } from "./servicesDebt";

export type locationStatus ="ALQUILADO"|"OFICINA"| "EN_REPARACIóN"| "A_LA_VENTA" | "DISPONIBLE_PARA_ALQUILAR" | "DEPOSITO" 
@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text", unique: true })
  name: string

  @Column({ type: "enum", enum: ["ALQUILADO","OFICINA", "EN_REPARACIóN", "A_LA_VENTA" , "DISPONIBLE_PARA_ALQUILAR","DEPOSITO" ], default: "ALQUILADO" })
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
