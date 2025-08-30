//building Service

import { Contract, contractStatus, taskAmount } from "../entity/contract";
import { Location } from "../entity/location";
import { Payment } from "../entity/payment";
import { Repair } from "../entity/repair";
import { ErrorType} from "../generalIntefaces";
import { baseService } from "./baseService";
export type repairData ={
        id?:number
        type: "REPARACIÓN"|"INVERSIÓN"| "OTRO"
        amount: number
        date: Date
        detalle: String
        status: "REALIZADO"| "PENDIENTE"| "EN_DESARROLLO"
        locationId:number
}

class RepairService extends baseService<Repair>{
    constructor(){
        super(Repair)
    }

    public async create(data:repairData): Promise<Repair|ErrorType> {
            const location:Location|null = await Location.findOne({where:{id:data.locationId}})
            if(!location){
                const result:ErrorType = {
                    message: "Location not found",
                    statusCode: 404
                };
                return result;
            }
            data as Omit<repairData,"locationId"> 
            return await super.create({...data,location})  
        }
    

    async update(id: number, data:Partial<repairData>): Promise<Repair | ErrorType> {
        const dataToUpdate:Partial<Repair> = {}
        if(data.locationId){
            const location = await Location.findOne({ where: { id: data.locationId } });
            if(!location){
                const result:ErrorType = {message: "Location not found",statusCode: 404};
                return result;
            }
            delete data.locationId;
            dataToUpdate.location = location;
        }
        Object.assign(dataToUpdate,data)
        return super.update(id,dataToUpdate)
    }
    
    public async getByLocationId(locationId:number): Promise<Contract[]|ErrorType> {
        return await Contract.find({where:{location:{id:locationId}}})
            .catch(error => {
                const result:ErrorType = {message: "Error getting contracts",statusCode: 500};
                console.log(result.message,error);
                return result;
            })
    }


    }
    export const repairService = new RepairService()