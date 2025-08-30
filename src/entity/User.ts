import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import * as bcrypt from "bcryptjs";
import settings from "../config/settings";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: "user" })
  role!: string;

  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, settings.SALT);
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
