import { MigrationInterface, QueryRunner, Table } from "typeorm";
import * as bcrypt from "bcryptjs";
import config from "../config/config";

export class AddUserEntity1755614529535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    // Hashear la contraseña para el usuario administrador
    const hashedPassword = await bcrypt.hash("admin", 10);

    // Insertar el usuario admin usando el queryRunner para asegurar que sea parte de la transacción de la migración
    await queryRunner.query(
      `INSERT INTO "user" ("username", "password", "role") VALUES ('admin', $1, 'admin')`,
      [hashedPassword]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}