//building Service

import { Contract, contractStatus, taskAmount } from "../entity/contract";
import { Location } from "../entity/location";
import { ErrorType} from "../generalIntefaces";
import { baseService } from "./baseService";
export type contractData ={
        locationId:number,
        tenant:string,
        tenantDNI:number,
        startDate:Date,
        endDate:Date,
        sheduleAmount:taskAmount[],
        status:contractStatus                
}

class ContractService extends baseService<Contract>{
    constructor(){
        super(Contract)
    }

    public async create(data:contractData): Promise<Contract|ErrorType> {
            const location:Location|null = await Location.findOne({where:{id:data.locationId}})
            if(!location){
                const result:ErrorType = {
                    message: "Location not found",
                    statusCode: 404
                };
                return result;
            }
            delete data.locationId
            return await super.create({...data,location})  
        }
    

    async update(id: number, data:Partial<contractData>): Promise<Contract | ErrorType> {
        const dataToUpdate:Partial<Contract> = {}
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

    static async getTotalDebt(id:number, date:Date):Promise<number|ErrorType> {
        let result:number|ErrorType;
        try {
            const contract = await Contract.findOneOrFail({ where: { id }, relations: { payments: true } });
            const totalDebt = contract.sheduleAmount
                .map((task: taskAmount) => {
                    let result = [] as taskAmount[];
                    if(task.months<=0) return [];
                    if(task.months===1) return [task];
                    //expand task into multiple tasks of 1 month each
                    for (let index = 0; index < task.months-1; index++) {
                        let newTask:taskAmount = {amount:task.amount,startDate:task.startDate,months:1}
                        newTask.startDate.setMonth(newTask.startDate.getMonth()+index);
                        result.push(newTask);
                    }
                    return result;
                })
                .flat()
                .filter((task) => task.startDate <= (date))
                .reduce((total, payment) => total + payment.amount, 0) || 0;
            const totalPaid = contract.payments
                .filter(payment => payment.date <= date)
                .reduce((total, payment) => total + payment.amount, 0);
            result = totalDebt - totalPaid;
        } catch (error) {
            result = { message: "Error calculating total debt",statusCode: 500};
            console.log(result.message, error);
        }
        return result;
    }
    /*
    static async getOverduePayments(req: Request, res: Response) {
    }
    static async getContractsExpiringSoon(req: Request, res: Response) {
    }
    static async renewContract(req: Request, res: Response) {
    }
    static async cancelContract(req: Request, res: Response) {
    }
    static async getContractsByTenantDNI(req: Request, res: Response) {
    }
    static async getContractsByStatus(req: Request, res: Response) {
    }
    static async getContractsWithPendingPayments(req: Request, res: Response) {
    }
    static async getContractsWithOverduePayments(req: Request, res: Response) {
    }*/

    }
    export const contractService = new ContractService()