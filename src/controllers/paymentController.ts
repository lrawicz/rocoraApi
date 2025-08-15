//contract controller
import { Request, Response } from "express";
import { paymentData,  paymentService } from "../services/paymentService";
import { ErrorType, Pagination } from "../generalIntefaces";
import { Payment } from "../entity/payment";
export class PaymentController {
    static async getAll(req: Request, res: Response) {
        try {
            let page = req.query.page? Number(req.query.page) : 1;
            let limit = req.query.limit? Number(req.query.limit) : 10;
            if(page<1) page=1;
            if(limit<1) limit=10;
            const options = req.query.options? JSON.parse(req.query.options as string) : undefined;
            const result:Pagination<Payment>|ErrorType = await paymentService.getAll({page,limit});
            if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
            return res.json(result);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error fetching payments" });
        }
    }
    
    static async create(req: Request, res: Response) {
        const data:paymentData = req.body? req.body as paymentData : undefined;
        if(!data) return res.status(400).json({ message: "Invalid data" });
        const result:Payment|ErrorType = await paymentService.create(data);
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(201).json(result);
    }
    static async getById(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid contract ID" });
        const result:Payment|ErrorType = await paymentService.getById(id)
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(200).json(result);
    }

    static async update(req: Request, res: Response) {
        const id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid contract ID" });
        const data:Partial<paymentData> = req.body? req.body as paymentData : undefined;
        let result:Payment|ErrorType = await paymentService.update(id,data)
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(200).json(result);
    }
    static async delete(req: Request, res: Response) {
        const  ids:number[] = (req.params.id as string).split(",").map(Number);
        if (ids.length===0) return res.status(400).json({ message: "Invalid building ID" });
        const result:boolean|ErrorType = await paymentService.hardDelete(ids)
        if( typeof result !== "boolean") return res.status(result.statusCode).json({ message: result.message});
        return res.status(204).json(result);
    }

}

export default PaymentController;