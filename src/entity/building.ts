import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Location } from "./location";

@Entity()
export class Building extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    direction: string
    
    @OneToMany(type => Location, location => location.building, 
        //{ cascade: true }
    ) locations: Location[];  

}