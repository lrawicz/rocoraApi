//contract controller
import { Request, Response } from "express";
import { Contract } from "../entity/contract";
import { In } from "typeorm";
import { contractData,  contractService } from "../services/contractService";
import { ErrorType, Pagination } from "../generalIntefaces";
export class ContractController {
    static async getAll(req: Request, res: Response) {
        try {
            let page = req.query.page? Number(req.query.page) : 1;
            let limit = req.query.limit? Number(req.query.limit) : 10;
            if(page<1) page=1;
            if(limit<1) limit=10;
            const options = req.query.options? JSON.parse(req.query.options as string) : undefined;
            const result:Pagination<Contract>|ErrorType = await contractService.getAll({page,limit},["location"]);
            if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
            return res.json(result);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error fetching locations" });
        }
    }
    
    static async create(req: Request, res: Response) {
        const data:contractData = req.body? req.body as contractData : undefined;
        if(!data) return res.status(400).json({ message: "Invalid data" });
        const result:Contract|ErrorType = await contractService.create(data);
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(201).json(result);
    }
    static async getById(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid contract ID" });
        const result:Contract|ErrorType = await contractService.getById(id)
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(200).json(result);
    }

    static async getByLocationId(req: Request, res: Response) {
        const id:number|undefined = Number(req.params.id)|| undefined;
        const startDate:Date|undefined = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
        if (!id) return res.status(400).json({ message: "Invalid location Id" });
        const result:Contract[]|ErrorType = await contractService.getByLocationId(id)
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(200).json(result);
    }
    static async update(req: Request, res: Response) {
        const id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid contract ID" });
        const data:Partial<contractData> = req.body? req.body as contractData : undefined;
        let result:Contract|ErrorType = await contractService.update(id,data)
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(200).json(result);
    }
    static async delete(req: Request, res: Response) {
        const  ids:number[] = (req.params.id as string).split(",").map(Number);
        if (ids.length===0) return res.status(400).json({ message: "Invalid building ID" });
        const result:boolean|ErrorType = await contractService.hardDelete(ids)
        if( typeof result !== "boolean") return res.status(result.statusCode).json({ message: result.message});
        return res.status(204).json(result);
    }

    static async getActiveContracts(req: Request, res: Response) {
        try {
            let locationsName = req.query.locationsName as string[] || [];
            const where:any = { status: "ACTIVE" }
            if (locationsName.length !== 0) where['location'] = { name:  In(locationsName) };
            const contracts = await Contract.find({ where, relations: { location: true } });
            return res.json(contracts);
        } catch (error) {
            res.status(500).json({ message: "Error fetching active contracts" });
        }
    }
    
    static async getTotalDebt(req: Request, res: Response) {
        const contractId:number|undefined = Number(req.params.id)|| undefined;
        if (!contractId) return res.status(400).json({ message: "Invalid contract ID" });
        const date:Date = req.query.date ? new Date(req.query.date as string) : new Date();
        const result:{totalDebt:number}|ErrorType = await contractService.getTotalDebt(contractId,date)
        if('statusCode' in result)  return res.status(result.statusCode).json({ message: result.message });
        return res.json(result);
    }
    

}

export default ContractController;