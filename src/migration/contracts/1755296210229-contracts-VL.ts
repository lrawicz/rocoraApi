import { MigrationInterface, QueryRunner } from "typeorm";

export class Contracts_VL_1755296210229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Virrey Liniers
        await queryRunner.query(`
            INSERT INTO "contract" ("id", "tenant", "tenantDNI", "startDate", "endDate", "sheduleAmount", "status", "locationId")
            VALUES 
                (101,
                'Marlene Yamile Yza',
                'DNI', 
                '2023-01-01', '2025-12-31', 
                '[]', 
                'ACTIVO', 101),

                (102,
                'Cornelio Cip. Guaymas',
                'DNI', 
                '2023-01-01', '2023-06-30', 
                '[]', 
                'VENCIDO', 101),

                (104,
                'Carolina Federica Medina',
                'DNI', 
                '2023-01-01', '2023-12-31', 
                '[]', 
                'ACTIVO', 104),

                (105,
                'Jose Valdez',
                'DNI', 
                '2023-04-01', '2026-03-31', 
                '[]', 
                'JUICIO', 105),

                (106,
                'Gaston Gabriel Cegovia',
                'DNI', 
                '2023-04-01', '2026-03-31', 
                '[]', 
                'ACTIVO', 106),

                (109,
                'Dora Haydee Gonzalez',
                'DNI', 
                '2022-05-01', '2025-06-30', 
                '[]', 
                'ACTIVO', 109),

                (110,
                'Natalia Soledad Soto ',
                'DNI', 
                '2023-06-01', '2026-05-31', 
                '[]', 
                'ACTIVO', 110),

                (111,
                'Paolo Mestanza',
                'DNI', 
                '2023-01-01', '2000-01-01', 
                '[]', 
                'VENCIDO', 111),

                (112,
                'Mariahan Santillan',
                'DNI', 
                '2023-07-25', '2000-01-01', 
                '[]', 
                'ACTIVO', 112),

                (113,
                'Matias Maximiliano Zarate',
                'DNI', 
                '2023-07-25', '2000-01-01', 
                '[]', 
                'ACTIVO', 113),

                (114,
                'Cintya Noelia  Murillo',
                'DNI', 
                '2022-11-01', '2025-10-31', 
                '[]', 
                'ACTIVO', 114),

                (115,
                'Alexis Damian Mendieta',
                'DNI', 
                '2020-01-01', '2020-01-01', 
                '[]', 
                'VENCIDO', 115),

                (116,
                'Francisco Medina',
                'DNI', 
                '2023-01-01', '2023-06-30', 
                '[]', 
                'VENCIDO', 116),

                (118,
                'David Dario Flores',
                'DNI', 
                '2023-01-01', '2023-06-30', 
                '[]', 
                'VENCIDO', 118)
            `)

        // Beauchef
        await queryRunner.query(`
            INSERT INTO "contract" ("id", "tenant", "tenantDNI", "startDate", "endDate", "sheduleAmount", "status", "locationId")
            VALUES 
                (201,
                'Aldo Miguel Ulik',
                'DNI', 
                '2023-08-01', '2026-07-31', 
                '[]', 
                'ACTIVO', 201)`
        )

        // Arsobispo Espinosa
        await queryRunner.query(`
            INSERT INTO "contract" ("id", "tenant", "tenantDNI", "startDate", "endDate", "sheduleAmount", "status", "locationId")
            VALUES 
                (385,
                'Daniel Edgardo Villarreal',
                'DNI', 
                '2024-10-01', '2026-09-30', 
                '[]', 
                'ACTIVO', 385),

                (309,
                'Anabella Abril Rojas',
                'DNI', 
                '2025-06-01', '2028-05-31', 
                '[]', 
                'ACTIVO', 309)
                `
        )

        // Salcedo
        await queryRunner.query(`
            INSERT INTO "contract" ("id", "tenant", "tenantDNI", "startDate", "endDate", "sheduleAmount", "status", "locationId")
            VALUES 
                (401,
                'Miguel Angel Gonzalez',
                'DNI', 
                '2025-06-01', '2028-05-31', 
                '[]', 
                'ACTIVO', 401),

                (403,
                'Adrian Santiago Vera',
                'DNI', 
                '1900-01-01', '1900-01-01', 
                '[]', 
                'VENCIDO', 403),

                (404,
                'Javier Cordoba',
                'DNI', 
                '1900-01-01', '1900-01-01', 
                '[]', 
                'VENCIDO', 404),

                (405,
                'Pablo Julian Pelay',
                'DNI', 
                '2025-02-01', '2027-01-31', 
                '[]', 
                'ACTIVO', 405),

                (406,
                'Elizabeth Yesica Alfaro',
                'DNI', 
                '2023-12-01', '1900-01-01', 
                '[]', 
                'ACTIVO', 406)
                `
        )
        // Olavaria
        await queryRunner.query(`
            INSERT INTO "contract" ("id", "tenant", "tenantDNI", "startDate", "endDate", "sheduleAmount", "status", "locationId")
            VALUES 
                (501,
                'Mercedes Santa Cruz',
                'DNI', 
                '1900-12-01', '1900-01-01', 
                '[]', 
                'VENCIDO', 501),

                (502,
                'Lidia Santillan',
                'DNI', 
                '1900-12-01', '1900-01-01', 
                '[]', 
                'VENCIDO', 502),

                (503,
                'Matias Leonel Acosta',
                'DNI', 
                '2024-12-01', '2026-10-31', 
                '[]', 
                'ACTIVO', 503),

                (504,
                'Marcos Federico Flores',
                'DNI', 
                '1900-12-01', '1900-10-31', 
                '[]', 
                'VENCIDO', 504),

                (505,
                'Alexis Padilla Hernandez',
                'DNI', 
                '2022-07-01', '2021-05-31', 
                '[]', 
                'ACTIVO', 505),

                (506,
                'Gaston Paone',
                'DNI', 
                '1900-01-01', '1900-01-01', 
                '[]', 
                'VENCIDO', 505)
                `)
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "contract";
        `)
    }

}
