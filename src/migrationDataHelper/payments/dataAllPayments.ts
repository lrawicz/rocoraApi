import { QueryRunner } from "typeorm";
import { dataPaymentAB01_up } from "./AB/dataAB01";
import { dataPaymentAB02_up } from "./AB/dataAB02";
import { dataPaymentAB04_up } from "./AB/dataAB04";
import { dataPaymentAB05_up } from "./AB/dataAB05";
import { dataPaymentAB07_up } from "./AB/dataAB07";
import { dataPaymentAB08_up } from "./AB/dataAB08";
import { dataPaymentAB09_up } from "./AB/dataAB09";
import { dataPaymentAB10_up } from "./AB/dataAB10";
import { dataPaymentAB11_up } from "./AB/dataAB11";
import { dataPaymentAB12_up } from "./AB/dataAB12";
import { dataPaymentAB13_up } from "./AB/dataAB13";
import { dataPaymentAB14_up } from "./AB/dataAB14";
import { dataPaymentAB15_up } from "./AB/dataAB15";
import { dataPaymentAB16_up } from "./AB/dataAB16";
import { dataPaymentAB17_up } from "./AB/dataAB17";
import { dataPaymentAB18_up } from "./AB/dataAB18";
import { dataPaymentAB19_up } from "./AB/dataAB19";
import { dataPaymentAB20_up } from "./AB/dataAB20";
import { dataPaymentAB21_up } from "./AB/dataAB21";
import { dataPaymentAB22_up } from "./AB/dataAB22";
import { dataPaymentAB23_up } from "./AB/dataAB23";
import { dataPaymentAB24_up } from "./AB/dataAB24";
import { dataPaymentAB25_up } from "./AB/dataAB25";
import { dataPaymentAB26_up } from "./AB/dataAB26";


import { dataPaymentABA_up } from "./AB/dataABA";
import { dataPaymentABB_up } from "./AB/dataABB";
import { dataPaymentABC_up } from "./AB/dataABC";
import { dataPaymentABD_up } from "./AB/dataABD";
import { dataPaymentABE_up } from "./AB/dataABE";
import { dataPaymentABF_up } from "./AB/dataABF";
import { dataPaymentABG_up } from "./AB/dataABG";
import { dataPaymentABH_up } from "./AB/dataABH";
import { dataPaymentABI_up } from "./AB/dataABI";

import { dataPaymentVL01_up } from "./VL/dataVL01";
import { dataPaymentVL02_up } from "./VL/dataVL02";
import { dataPaymentVL04_up } from "./VL/dataVL04";
import { dataPaymentVL05_up } from "./VL/dataVL05";
import { dataPaymentVL06_up } from "./VL/dataVL06";
import { dataPaymentVL09_up } from "./VL/dataVL09";
import { dataPaymentVL10_up } from "./VL/dataVL10";
import { dataPaymentVL11_up } from "./VL/dataVL11";
import { dataPaymentVL12_up } from "./VL/dataVL12";
import { dataPaymentVL13_up } from "./VL/dataVL13";
import { dataPaymentVL14_up } from "./VL/dataVL14";
import { dataPaymentVL15_up } from "./VL/dataVL15";
import { dataPaymentVL16_up } from "./VL/dataVL16";
import { dataPaymentVL17_up } from "./VL/dataVL17";
import { dataPaymentVL18_up } from "./VL/dataVL18";

import { dataPaymentO01_up } from "./O/dataO01";
import { dataPaymentO02_up } from "./O/dataO02";
import { dataPaymentO03_up } from "./O/dataO03";
import { dataPaymentO04_up } from "./O/dataO04";
import { dataPaymentO05_up } from "./O/dataO05";
import { dataPaymentO06_up } from "./O/dataO06";


import { dataPaymentS01_up } from "./S/dataS01";
import { dataPaymentS02_up } from "./S/dataS02";
import { dataPaymentS03_up } from "./S/dataS03";
import { dataPaymentS04_up } from "./S/dataS04";
import { dataPaymentS05_up } from "./S/dataS05";
import { dataPaymentS06_up } from "./S/dataS06";
import { dataPaymentS07_up } from "./S/dataS07";
import { dataPaymentS08_up } from "./S/dataS08";

import { dataPaymentB01_up } from "./B/dataB01";

import { dataPaymentAE09_up } from "./AE/dataAE09";
import { dataPaymentAEE_up } from "./AE/dataAEE";






export async function allPaymentsUp(queryRunner: QueryRunner): Promise<void> {
  await dataPaymentAB01_up(queryRunner)
  await dataPaymentAB02_up(queryRunner)
  await dataPaymentAB04_up(queryRunner)
  await dataPaymentAB05_up(queryRunner)
  await dataPaymentAB07_up(queryRunner)
  await dataPaymentAB08_up(queryRunner)
  await dataPaymentAB09_up(queryRunner)
  await dataPaymentAB10_up(queryRunner)
  await dataPaymentAB11_up(queryRunner) 
  await dataPaymentAB12_up(queryRunner) 
  await dataPaymentAB13_up(queryRunner) 
  await dataPaymentAB14_up(queryRunner) 
  await dataPaymentAB15_up(queryRunner) 
  await dataPaymentAB16_up(queryRunner) 
  await dataPaymentAB17_up(queryRunner) 
  await dataPaymentAB18_up(queryRunner) 
  await dataPaymentAB19_up(queryRunner) 
  await dataPaymentAB20_up(queryRunner) 
  await dataPaymentAB21_up(queryRunner) 
  await dataPaymentAB22_up(queryRunner) 
  await dataPaymentAB23_up(queryRunner) 
  await dataPaymentAB24_up(queryRunner) 
  await dataPaymentAB25_up(queryRunner) 
  await dataPaymentAB26_up(queryRunner) 
  await dataPaymentABA_up(queryRunner)
  await dataPaymentABB_up(queryRunner)
  await dataPaymentABC_up(queryRunner)
  await dataPaymentABD_up(queryRunner)
  await dataPaymentABE_up(queryRunner)
  await dataPaymentABF_up(queryRunner)
  await dataPaymentABG_up(queryRunner)
  await dataPaymentABH_up(queryRunner)
  await dataPaymentABI_up(queryRunner)

  await dataPaymentVL01_up(queryRunner)
  await dataPaymentVL02_up(queryRunner)
  await dataPaymentVL04_up(queryRunner)
  await dataPaymentVL05_up(queryRunner)
  await dataPaymentVL06_up(queryRunner)
  await dataPaymentVL09_up(queryRunner)
  await dataPaymentVL10_up(queryRunner)
  await dataPaymentVL11_up(queryRunner)
  await dataPaymentVL12_up(queryRunner)
  await dataPaymentVL13_up(queryRunner)
  await dataPaymentVL14_up(queryRunner)
  await dataPaymentVL15_up(queryRunner)
  await dataPaymentVL16_up(queryRunner)
  await dataPaymentVL17_up(queryRunner)
  await dataPaymentVL18_up(queryRunner)

  await dataPaymentO01_up(queryRunner)
  await dataPaymentO02_up(queryRunner)
  await dataPaymentO03_up(queryRunner)
  await dataPaymentO04_up(queryRunner)
  await dataPaymentO05_up(queryRunner)
  await dataPaymentO06_up(queryRunner)

  await dataPaymentS01_up(queryRunner)
  //await dataPaymentS02_up(queryRunner)
  await dataPaymentS03_up(queryRunner)
  await dataPaymentS04_up(queryRunner)
  await dataPaymentS05_up(queryRunner)
  await dataPaymentS06_up(queryRunner)
  await dataPaymentS07_up(queryRunner)
  await dataPaymentS08_up(queryRunner)

  await dataPaymentAE09_up(queryRunner)
  await dataPaymentAEE_up(queryRunner)

  await dataPaymentB01_up(queryRunner)


  await queryRunner.query(`
    SELECT setval(pg_get_serial_sequence('payment', 'id'), (SELECT MAX(id) FROM payment));
    `)
  }
  export async function allPaymentsDown(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "payment" WHERE "date"< '2025-08-17'`)

    await queryRunner.query(`
      SELECT setval(pg_get_serial_sequence('payment', 'id'), (SELECT MAX(id) FROM payment));
    `)
}