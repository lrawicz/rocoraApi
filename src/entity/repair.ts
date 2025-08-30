import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
import { Location } from "./location";

@Entity()
export class Repair extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('enum',{enum:["REPARACIÓN","INVERSIÓN"]})
    type!: "REPARACIÓN"|"INVERSIÓN"| "OTRO"

    @Column('float')
    amount!: number

    @Column('date')
    date!: Date

    @Column('text')
    detail!: String

    @Column('enum', { enum: ["REALIZADO", "PENDIENTE", "EN_DESARROLLO"] })
    status!: "REALIZADO"| "PENDIENTE"| "EN_DESARROLLO"

    //relations

    @ManyToOne(type => Location, location => location.repairs) 
    location!: Location


    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
    
}