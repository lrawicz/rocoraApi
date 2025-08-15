//location controller
import { Request, Response } from "express";
import { Location, locationStatus } from "../entity/location";
import { Building } from "../entity/building";
import { locationData, locationService } from "../services/locationService";
import { ErrorType, Pagination } from "../generalIntefaces";

export class LocationController {
    static async getAll(req: Request, res: Response) {
        try {
            let page = req.query.page? Number(req.query.page) : 1;
            let limit = req.query.limit? Number(req.query.limit) : 10;
            if(page<1) page=1;
            if(limit<1) limit=10;
            const result:Pagination<Location>|ErrorType = await locationService.getAll({page,limit});
            if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
            return res.json(result);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error fetching locations" });
        }
    }
    static async create(req: Request, res: Response) {
        const data:locationData = req.body? req.body as locationData : undefined;
        const result = await locationService.create(data);
        if(!result) return res.status(500).json({ message: "Error creating location" });
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(201).json(result);
    }
  
    static async getById(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        console.log("Requested Building ID:", id); // Debugging line
        if (!id) return res.status(400).json({ message: "Invalid building ID" });

        const result:Location|ErrorType = await locationService.getById(id);
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message });
        return res.status(200).json(result);
    }

    static async getByName(req: Request, res: Response) {
        const  name:string|undefined = req.params.name|| undefined;
        if (!name) return res.status(400).json({ message: "Invalid location Name" });
        const result:Location|ErrorType = await locationService.getByName(name);
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message });
        return res.status(200).json(result);
    }
    static async update(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid location ID" });
        const data:Partial<locationData> = req.body? req.body as locationData : undefined;
        if(!data) return res.status(400).json({ message: "Invalid data" });
        const result = await locationService.update(id, data);
        if('statusCode' in result) return res.status(result.statusCode).json({ message: result.message});
        return res.status(200).json(result);
    }
    
    static async delete(req: Request, res: Response) {
        const  ids:number[] = (req.params.id as string).split(",").map(Number);
        if (ids.length===0) return res.status(400).json({ message: "Invalid building ID" });
        const result:boolean|ErrorType = await locationService.hardDelete(ids);
        if(typeof result !=="boolean") return res.status(result.statusCode).json({ message: result.message});
        return res.status(204).send();
    }
    
}

export default LocationController;