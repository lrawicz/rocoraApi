import { MigrationInterface, QueryRunner } from "typeorm";
import { dataBuildingDataDown, dataBuildingDataUp } from "../migrationDataHelper/buildingsAndLocations";
import { dataContractVL_down, dataContractVL_up } from "../migrationDataHelper/contracts/migrationContractVL";
import { dataContractAB_down, dataContractAB_up } from "../migrationDataHelper/contracts/migrationContractAB";
import { allPaymentsUp } from "../migrationDataHelper/payments/dataAllPayments";


export class Data1745292015545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await dataBuildingDataUp(queryRunner)
        
        //contracts
        await dataContractVL_up(queryRunner)
        await dataContractAB_up(queryRunner)

        //payments
        await allPaymentsUp(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await dataBuildingDataDown(queryRunner)
        await dataContractVL_down(queryRunner)
        await dataContractAB_down(queryRunner)

    }

}
