//building controller
import { Request, Response } from "express";
import { Building } from "../entity/building";
import { buildingData,  buildingService } from "../services/buildingService";
import { ErrorType, optionsGetAll, Pagination, parameterOption } from "../generalIntefaces";

export class BuildingController {
    static async getAll(req: Request, res: Response) {
        try {
            let page:number = req.query.page? Number(req.query.page) : 1;
            let limit:number = req.query.limit? Number(req.query.limit) : 10;
            if(page<1) page=1;
            if(limit<1) limit=10;
            const result:Pagination<Building>|ErrorType = await buildingService.getAll({limit,page});
            const direction:string|undefined = req.query.direction? String(req.query.direction) : undefined;
            const id:string|undefined = req.query.id? String(req.query.id) : undefined;
            const params:optionsGetAll<Building> = {
                page,
                limit,
                parameterOptions: []
            }
            if(direction) params.parameterOptions?.push({
                columnName: "direction",
                typeOf: "string",
                criteria: { like: direction }            
            })
            if(id) params.parameterOptions?.push({
                columnName: "id",
                typeOf: "number",
                criteria: { value: id }
            })

            const result:Pagination<Building>|ErrorType = await buildingService.getAll(params);
            if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
            return res.json(result);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error fetching locations" });
        }
    }

    static async create(req: Request, res: Response) {
        const  direction:string|undefined = req.body.direction? req.body.direction:undefined;
        if(direction===undefined) return res.status(400).json({ message: "Invalid direction" });
        const result = await buildingService.create({direction});
        if(!result) return res.status(500).json({ message: "Error creating location" });
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(201).json(result);
    }
    static async getById(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        console.log("Requested Building ID:", id); // Debugging line
        if (!id) return res.status(400).json({ message: "Invalid building ID" });

        const result:Building|ErrorType = await buildingService.getById(id);
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message });
        return res.status(200).json(result);
    }

    static async update(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid building ID" });
        const data:Partial<buildingData>|undefined = req.body as buildingData || undefined;
        if(!data) return res.status(400).json({ message: "Invalid data" });
        const result = await buildingService.update(id, data);
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(200).json(result);
    }

    static async delete(req: Request, res: Response) {
        const  ids:number[] = (req.params.id as string).split(",").map(Number);
        if (ids.length===0) return res.status(400).json({ message: "Invalid building ID" });
        const result:boolean|ErrorType = await buildingService.hardDelete(ids);
        if(typeof result !=="boolean") return res.status(result.statusCode).json({ message: result.message});
        return res.status(204).send();
    }
}

export default BuildingController;