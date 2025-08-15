//building Service
import { Contract } from "../entity/contract";
import { Payment } from "../entity/payment";
import { ErrorType  } from "../generalIntefaces";
import { baseService } from "./baseService";
export type paymentData ={
        date:Date,
        amount:number,
        locationName?:string
        locationId?:number
        contractId?:number
}
class PaymentService extends baseService<Payment>{
    constructor(){
        super(Payment)
    }
    public async create(data:paymentData): Promise<Payment|ErrorType> {
        let where: any = {}
        if(data.locationName) where.location.name = data.locationName
        if(data.locationId) where.location.id = data.locationId
        if(data.contractId) where.id = data.contractId
        const contract:Contract|null = await Contract.findOne({where,relations:{location:true}})
        if(!contract){
            const result:ErrorType = {
                message: "Contract not found",
                statusCode: 404
            };
            return result;
        }
        delete data.locationName
        delete data.locationId
        delete data.contractId
        return await super.create({...data,contract})
    }

    public async update(id: number, data:Partial<paymentData>): Promise<Payment | ErrorType> {
        const dataToUpdate:Partial<Payment> = {}
        let where: any = {}
        if(data.locationId || data.locationName || data.contractId){
            if(data.locationName) where.location.name = data.locationName
            if(data.locationId) where.location.id = data.locationId
            if(data.contractId) where.id = data.contractId
            const contract:Contract|null = await Contract.findOne({where,relations:{location:true}})
            if(!contract){
                const result:ErrorType = {
                    message: "Contract not found",
                    statusCode: 404
                };
                return result;
            }
            delete data.locationName
            delete data.locationId
            delete data.contractId
            dataToUpdate.contract = contract
        }
        Object.assign(dataToUpdate,data)
        return super.update(id,dataToUpdate)
    }

}

export const paymentService = new PaymentService()