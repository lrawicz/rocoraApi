//building Service

import { Contract, contractStatus, taskAmount } from "../entity/contract";
import { Location } from "../entity/location";
import { Payment } from "../entity/payment";
import { ErrorType, optionsGetAll, Pagination} from "../generalIntefaces";
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
    public async getAll(filter: optionsGetAll<Contract>, relations?: string[]): Promise<Pagination<(Contract & {displayName:string})> | ErrorType> {
        const contracts:Pagination<Contract> | ErrorType = await super.getAll(filter,relations)
        if("statusCode" in contracts) return contracts

        const contractsWithDisplayNames:(Contract & {displayName:string})[]= contracts.items.map((item:Contract)=>{
            return {...item,displayName:`${item.location.name} - ${item.tenant}`} as (Contract & {displayName:string})
        })
        return {
            ...contracts,
            items: contractsWithDisplayNames
        }
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
    public multiplyTaskAmount(task: taskAmount){
        let result = [] as taskAmount[];
        if(task.months<=0) return [];
        if(task.months===1) return [task];
        //expand task into multiple tasks of 1 month each
        for (let index = 0; index < task.months-1; index++) {
            const newTask:taskAmount = {amount:task.amount,startDate:new Date(task.startDate),months:1}
            newTask.startDate.setMonth(newTask.startDate.getMonth()+index);
            result.push(newTask);
        }
        return result;
    }
    /**
     * @description Genera un listado de los pagos mensuales vencidos para todos los contratos.
     * @param cutOffDate La fecha de corte para determinar los pagos vencidos (por defecto, la fecha actual).
     * @returns Una promesa con un array de objetos que representan cada pago mensual vencido.
     */
    async  getVencimientosMensuales(contractId:number,cutOffDate: Date = new Date()): Promise<any[]> {
        const result = await Contract
            .createQueryBuilder('c')
            .select([
                'c.id AS "contractId"',
                'c.tenant AS "tenantName"',
                't.amount AS "monthlyAmount"',
                't.payment_month AS "paymentMonth"'
            ])
            .from(subQuery => {
                return subQuery
                    .from(Contract, 'contract')
                    .addSelect('contract.id', 'id')
                    .addSelect(
                        '(jsonb_array_elements("sheduleAmount")->>\'amount\')::numeric',
                        'amount'
                    )
                    .addSelect(
                        '((jsonb_array_elements("sheduleAmount")->>\'startDate\')::date + ' +
                        '(jsonb_array_elements("sheduleAmount")->>\'months\')::integer * INTERVAL \'1 month\')',
                        'payment_month'
                    );
            }, 't')
            .where('c.id = t.id')
            .andWhere('t.payment_month <= :cutOffDate', { cutOffDate })
            .andWhere(`c.id = ${contractId}`)
            .orderBy('c.id, t.payment_month')
            .getRawMany();

        return result;
    }
    public async getTotalDebt(locationId:number, date:Date):Promise<{totalDebt:number}|ErrorType> {
        let result:{totalDebt:number}|ErrorType;
        try {
            const contract = await Contract.findOne({ where: { location:{id:locationId} }, relations: { location: true } });
            if(!contract)
                return { message: "Contract not found",statusCode: 404};

            const payments = await Payment.find({ where: { contract: { id: contract.id } } });

            if(!payments)
                return { message: "Payments not found",statusCode: 404};
            const totalDebt = contract.sheduleAmount
                .map(this.multiplyTaskAmount)
                .flat()
                .filter((task) => task.startDate <= (date))
                .reduce((total, payment) => total + payment.amount, 0) || 0;
            const totalPaid = payments
                .filter(payment => payment.date <= date)
                .reduce((total, payment) => total + payment.amount, 0);
            result = {totalDebt:totalDebt - totalPaid};
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