//building Service
import { Contract } from "../entity/contract";
import { Location } from "../entity/location";
import { Payment } from "../entity/payment";
import { ErrorType, optionsGetAll, Pagination  } from "../generalIntefaces";
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
    public async createWithLocationName(data:{date:Date,amount:number,locationName:string}){
        const location:Location|null = await Location.findOne({where:{name:data.locationName}})
        if(!location){
            const result:ErrorType = {
                message: "Location not found",
                statusCode: 404
            };
            return result;
        }
        data as Omit<typeof data,"locationName">
        return await super.create({...data,location})
    }
    public async getAll(filter: optionsGetAll<Payment>, relations?: string[]): Promise<Pagination<(Payment & {contractDisplayName:string})> | ErrorType> {
        const contracts:Pagination<Payment> | ErrorType = await super.getAll(filter,relations)
        if("statusCode" in contracts) return contracts

        const contractsWithDisplayNames:(Payment & {contractDisplayName:string})[]= contracts.items.map((item:Payment)=>{
            return {
                ...item,
                contractDisplayName:`${item.contract.location.name} - ${item.contract.tenant}`
            } as (Payment & {contractDisplayName:string})
        })
        return {
            ...contracts,
            items: contractsWithDisplayNames
        }
        return super.getAll(filter,relations)
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