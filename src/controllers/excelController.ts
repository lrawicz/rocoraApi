//payment controller
import { Request, Response } from "express";
import { Payment } from "../entity/payment";
import { Location } from "../entity/location";
import { Contract } from "../entity/contract";
import { In, MoreThanOrEqual } from "typeorm";
import { contractService } from "../services/contractService";

export class ExcelController {
    static async getLocationAllInfo(req: Request, res: Response) {
        try{
            const now:Date = new Date();
            const nowLess1Year:Date = new Date(now.getFullYear()-1,now.getMonth(),now.getDate());
            const locationName:string = req.query.locationName as string;
            const startDate:Date = req.query.startDate ? new Date(req.query.startDate as string):nowLess1Year
            const endDate:Date = req.query.startDate ? new Date(req.query.endDate as string): new Date();
            const contracts:Contract[] = await Contract.find({where:{endDate:MoreThanOrEqual(startDate),location:{name:locationName}},relations:{location:true}})
            const payments:Payment[] = await Payment.find({where:{date:MoreThanOrEqual(startDate),contract:{id:In(contracts.map(contract=>contract.id))}},relations:{contract:true}})
            const deudas = contracts
                .map(contract=>{
                    return contract.sheduleAmount.map(contractService.multiplyTaskAmount)
                })
                .flat(2)
                .map(task=>{
                    return {...task,type:"deuda"}
                })
                //.sort((a,b)=>a.startDate>b.startDate?1:-1)
            const pagos = payments
                .map(payment=>{
                    return {...payment,type:"pago"}
                })
            let result = [...deudas, ...pagos]
                .sort((a,b)=>{
                    let ADate = "startDate" in a? a.startDate:a.date;
                    let BDate = "startDate" in b? b.startDate:b.date;
                    return ADate>BDate?1:-1
                })
            res.json(result);
        }catch{
            res.status(500).json({ message: "Error fetching data" });
        }
    }
    static async getLocationInfoByMonth(req: Request, res: Response) {
try{
            const now:Date = new Date();
            const nowLess1Year:Date = new Date(now.getFullYear()-1,now.getMonth(),now.getDate());
            const locationName:string = req.query.locationName as string;
            const startDate:Date = req.query.startDate ? new Date(req.query.startDate as string):nowLess1Year
            const endDate:Date = req.query.startDate ? new Date(req.query.endDate as string): new Date();
            const contracts:Contract[] = await Contract.find({where:{endDate:MoreThanOrEqual(startDate),location:{name:locationName}},relations:{location:true}})
            const payments:Payment[] = await Payment.find({where:{date:MoreThanOrEqual(startDate),contract:{id:In(contracts.map(contract=>contract.id))}},relations:{contract:true}})
            const deudas = contracts
                .map(contract=>{
                    return contract.sheduleAmount.map(contractService.multiplyTaskAmount)
                })
                .flat(2)
                .map(task=>{
                    return {...task,type:"deuda"}
                })
                //.sort((a,b)=>a.startDate>b.startDate?1:-1)
            const pagos = payments
                .reduce((acc:Record<string,number>,payment:Payment)=>{
                    const key = `${payment.date.getFullYear()}-${(payment.date.getMonth()+1).toString().padStart(2,'0')}`
                    if (key in acc) {
                        acc[key] +payment.amount
                    } else {
                        acc[key] = payment.amount;
                    }
                    return acc;
                },{})
                
                
            let result = [...deudas, ...pagos]
                .sort((a,b)=>{
                    let ADate = "startDate" in a? a.startDate:a.date;
                    let BDate = "startDate" in b? b.startDate:b.date;
                    return ADate>BDate?1:-1
                })
            res.json(result);
        }catch{
            res.status(500).json({ message: "Error fetching data" });
        }
    }
}