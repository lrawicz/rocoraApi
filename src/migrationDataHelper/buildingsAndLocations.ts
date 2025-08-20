import { QueryRunner } from "typeorm";

export async function dataBuildingDataUp (queryRunner: QueryRunner){
        //buildings
        await queryRunner.query(`
            INSERT INTO "building" ("id", "direction")
            VALUES 
                    (1, 'Virrey Liniers'),
                    (2, 'Beauchef'),
                    (3, 'Arsobispo Espinosa'),
                    (4, 'Salcedo'),
                    (5, 'Olavarria'),
                    (6, 'Almirante Brown')
                   ;
            `)
        // locations Virrey Liniers
        await queryRunner.query(`
            INSERT INTO "location" ("id", "name", "buildingId","status")
            VALUES 
                    (101, 'VL01', 1, 'ALQUILADO'), (102, 'VL02', 1, 'ALQUILADO'),
                    (104, 'VL04', 1, 'ALQUILADO'), (105, 'VL05', 1, 'ALQUILADO'),
                    (106, 'VL06', 1, 'ALQUILADO'), 
                                                (109, 'VL09', 1, 'ALQUILADO'),
                    (110, 'VL10', 1, 'ALQUILADO'), (111, 'VL11', 1, 'ALQUILADO'),
                    (112, 'VL12', 1, 'ALQUILADO'), (113, 'VL13', 1, 'ALQUILADO'),
                    (114, 'VL14', 1, 'ALQUILADO'), (115, 'VL15', 1, 'ALQUILADO'),
                    (116, 'VL16', 1, 'ALQUILADO'), (117, 'VL17', 1, 'ALQUILADO'),
                    (118, 'VL18', 1, 'ALQUILADO')
            `)
        // Beauchef
        await queryRunner.query(`
            INSERT INTO "location" ("id", "name", "buildingId","status")
            VALUES 
                    (201, 'B01', 2, 'ALQUILADO')
            `)
        // Arsovispo espinoza
        await queryRunner.query(`
            INSERT INTO "location" ("id", "name", "buildingId","status")
            VALUES 
                    (385, 'AEE', 3, 'ALQUILADO'),(309, 'AE09', 3, 'ALQUILADO')
            `)

        // Salcedo
        await queryRunner.query(`
            INSERT INTO "location" ("id", "name", "buildingId","status")
            VALUES 
                    (401, 'S01', 4, 'ALQUILADO'),(402, 'S02', 4, 'ALQUILADO'),
                    (403, 'S03', 4, 'ALQUILADO'),(404, 'S04', 4, 'ALQUILADO'),
                    (405, 'S05', 4, 'ALQUILADO'),(406, 'S06', 4, 'ALQUILADO'),
                    (407, 'S07', 4, 'ALQUILADO'),(408, 'S08', 4, 'ALQUILADO')
            `)

        // Olavarria
        await queryRunner.query(`
            INSERT INTO "location" ("id", "name", "buildingId","status")
            VALUES 
                    (501, 'O01', 5, 'ALQUILADO'),(502, 'O02', 5, 'ALQUILADO'),
                    (503, 'O03', 5, 'ALQUILADO'),(504, 'O04', 5, 'ALQUILADO'),
                    (505, 'O05', 5, 'ALQUILADO'),(506, 'O06', 5, 'ALQUILADO')
                    
            `)
        // Almirante Brown
        await queryRunner.query(`
            INSERT INTO "location" ("id", "name", "buildingId","status")
            VALUES 
                    (601, 'AB01', 6, 'ALQUILADO'), (602, 'AB02', 6, 'ALQUILADO'),
                                                   (604, 'AB04', 6, 'ALQUILADO'),
                    (605, 'AB05', 6, 'ALQUILADO'),
                    (607, 'AB07', 6, 'ALQUILADO'), (608, 'AB08', 6, 'ALQUILADO'),
                    (609, 'AB09', 6, 'ALQUILADO'), (610, 'AB10', 6, 'ALQUILADO'), 
                    (611, 'AB11', 6, 'ALQUILADO'),
                    (613, 'AB13', 6, 'ALQUILADO'), (614, 'AB14', 6, 'ALQUILADO'), 
                    (615, 'AB15', 6, 'ALQUILADO'), (616, 'AB16', 6, 'ALQUILADO'), 
                    (617, 'AB17', 6, 'ALQUILADO'), (618, 'AB18', 6, 'DEPOSITO'),
                    (619, 'AB19', 6, 'ALQUILADO'),
                    (621, 'AB21', 6, 'ALQUILADO'), (622, 'AB22', 6, 'ALQUILADO'),
                    (623, 'AB23', 6, 'ALQUILADO'), (624, 'AB24', 6, 'ALQUILADO'), 
                    (625, 'AB25', 6, 'ALQUILADO'),


                    (681, 'ABA', 6, 'ALQUILADO'), (682, 'ABB', 6, 'ALQUILADO'),
                                                  (684, 'ABD', 6, 'ALQUILADO'),
                    (685, 'ABE', 6, 'ALQUILADO'), (686, 'ABF', 6, 'ALQUILADO'),
                    (687, 'ABG', 6, 'ALQUILADO'), 
                    (689, 'ABI', 6, 'ALQUILADO')

            `)

        // setear el autoincrement en ID
        await queryRunner.query(`
            SELECT setval(pg_get_serial_sequence('location', 'id'), (SELECT MAX(id) FROM location));
        `)
        await queryRunner.query(`
            SELECT setval(pg_get_serial_sequence('building', 'id'), (SELECT MAX(id) FROM building));
        `)
}
export async function dataBuildingDataDown (queryRunner: QueryRunner){
    await queryRunner.query(`
            DELETE FROM "location";
        `)
        await queryRunner.query(`
            DELETE FROM "building"
            ;
        `)
}