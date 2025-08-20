import { QueryRunner } from "typeorm";


export async function dataContractAB_up(queryRunner: QueryRunner) {
        await queryRunner.query(`
            INSERT INTO "contract" ("id", "tenant", "tenantDNI", "startDate", "endDate", "sheduleAmount", "status", "locationId")
            VALUES 
                (601,
                'Carla Quinteros',
                'DNI', 
                '2022-04-01', '2025-03-01', 
                '[]', 
                'VENCIDO', 601),

                (602,
                'Thais Nakarys Lopez Villegas',
                'DNI', 
                '2021-02-01', '1900-01-01', 
                '[]', 
                'VENCIDO', 602),

                (604,
                'Elisa Maria Rodriguez',
                'DNI', 
                '2023-06-01', '2026-05-31', 
                '[]', 
                'VENCIDO', 604),

                (605,
                'Mariana Beatriz Moreira',
                'DNI', 
                '2023-06-01', '2026-05-31', 
                '[]', 
                'JUICIO', 605),

                (607,
                'Nazareno Cesar Gilio',
                'DNI', 
                '2022-07-01', '2025-06-25', 
                '[]', 
                'ACTIVO', 607),

                (610,
                'Camila Celeste Florentini',
                'DNI', 
                '2024-07-01', '2026-06-30', 
                '[]', 
                'ACTIVO', 610),


                (613,
                'Luis Fernando M. Rodriguez',
                'DNI', 
                '2025-02-01', '2027-01-31', 
                '[]', 
                'ACTIVO', 613),

                (614,
                'Ezequiel Guillermo Robles',
                'DNI', 
                '2018-06-18', '1900-01-01', 
                '[]', 
                'VENCIDO', 614),

                (615,
                'Claudia  Alfaro',
                'DNI', 
                '2009-08-01', '1900-01-01', 
                '[]', 
                'VENCIDO', 615),


                (616,
                'Gisela del Valle Quinteros',
                'DNI', 
                '2023-01-01', '2026-01-31', 
                '[]', 
                'ACTIVO', 616),

                (617,
                'Stefania Felisa Florentini',
                'DNI', 
                '2024-08-01', '2026-07-31', 
                '[]', 
                'ACTIVO', 617),

                (619,
                'Giuliana Giselle Ruiz',
                'DNI', 
                '2024-06-01', '2026-05-31', 
                '[]', 
                'ACTIVO', 619),

                (621,
                'Eduardo Nicolás Barreiro',
                'DNI', 
                '1900-01-01', '1900-01-01', 
                '[]', 
                'JUICIO', 621),

                (622,
                'Fabiola Estela Cariaga',
                'DNI', 
                '2018-08-01', '1900-01-01', 
                '[]', 
                'VENCIDO', 622),

                (623,
                'Nilda Eliana Arias',
                'DNI', 
                '2025-05-01', '2028-04-30', 
                '[]', 
                'ACTIVO', 623),

                (624,
                'Gustavo Adrian Delgado',
                'DNI', 
                '2019-03-01', '1900-01-01', 
                '[]', 
                'VENCIDO', 624),

                (625,
                'Veronica Consuel Sosa Tello',
                'DNI', 
                '2022-08-01', '2025-08-31', 
                '[]', 
                'ACTIVO', 625),



                (681,
                'Patricia Elianan Gutierrez',
                'DNI', 
                '2021-05-01', '2024-05-31', 
                '[]', 
                'ACTIVO', 681),

                (682,
                'Anastacia Rivero Gonzalez',
                'DNI', 
                '2022-03-01', '2025-03-31', 
                '[]', 
                'ACTIVO', 682),

                (684,
                'Jhonatan A. Gauna',
                'DNI', 
                '2020-07-01', '2023-07-31', 
                '[]', 
                'ACTIVO', 684),


                (685,
                'Marcos Joel G. Cuello',
                'DNI', 
                '2024-11-01', '2026-10-31', 
                '[]', 
                'ACTIVO', 685),

                (686,
                'Alfredo Escalante',
                'DNI', 
                '2022-05-01', '2025-06-30', 
                '[]', 
                'ACTIVO', 686),

                (687,
                'Nimia H. Gonzalez Rivero',
                'DNI', 
                '2018-04-01', '2020-03-31', 
                '[]', 
                'ACTIVO', 687),

                (689,
                'Santos Elias Feliciano',
                'DNI', 
                '2023-06-01', '2026-05-31', 
                '[]', 
                'ACTIVO', 689)
                
                `)
        await queryRunner.query(`
            SELECT setval(pg_get_serial_sequence('contract', 'id'), (SELECT MAX(id) FROM contract));
        `)
}
export async function dataContractAB_down(queryRunner: QueryRunner) {
        await queryRunner.query(`
            DELETE FROM "contract";
        `)
        await queryRunner.query(`
            SELECT setval(pg_get_serial_sequence('contract', 'id'), (SELECT MAX(id) FROM contract));
        `)
}

