//building controller
import { Request, Response } from "express";
import { Building } from "../entity/building";
import { BuildingService } from "../services/buildingService";

export class BuildingController {
    static async getAll(req: Request, res: Response) {
        try {
            let page = req.query.page? Number(req.query.page) : 1;
            let limit = req.query.limit? Number(req.query.limit) : 10;
            if(page<1) page=1;
            if(limit<1) limit=10;
            const result = await BuildingService.getAllBuildings(page,limit);
            return res.json(result);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error fetching locations" });
        }
    }

    static async create(req: Request, res: Response) {
        const  direction:string|undefined = req.body.direction? req.body.direction:undefined;
        console.log("Requested direction:", direction); // Debugging line
        if(direction===undefined) return res.status(400).json({ message: "Invalid direction" });
        const result = await BuildingService.createBuilding(direction);
        if(!result) return res.status(500).json({ message: "Error creating location" });
        return res.status(201).json(result);
    }
    static async getById(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        console.log("Requested Building ID:", id); // Debugging line
        if (!id) return res.status(400).json({ message: "Invalid building ID" });

        const result:Building|null = await BuildingService.getBuildingById(id);
        if(!result) return res.status(404).json({ message: "Building not found" });
        return res.status(200).json(result);
    }

    static async update(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid building ID" });

        const { direction } = req.body;
        const result = await BuildingService.updateBuilding(id, direction);
        if(!result) return res.status(404).json({ message: "Building not found" });
        return res.status(200).json(result);
    }

    static async delete(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid building ID" });
        const result = BuildingService.deleteBuilding(id);
        if(!result) return res.status(404).json({ message: "Building not found" }); 
        return res.status(204).send();

    }
}

export default BuildingController;