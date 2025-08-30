import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { Location } from "./location";

@Entity()
export class Building extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('text', { unique: true })
    direction!: string

    //relations
    @OneToMany(type => Location, location => location.building) 
    locations!: Location[];  

    //updates

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

}