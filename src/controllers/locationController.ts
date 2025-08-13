//location controller
import { Request, Response } from "express";
import { Location, locationStatus } from "../entity/location";
import { Building } from "../entity/building";
import { locationData, LocationService } from "../services/locationService";
import { BuildingService } from "../services/buildingService";

export class LocationController {
    static async getAll(req: Request, res: Response) {
        let page = req.query.page ? Number(req.query.page) : 1;
        let limit = req.query.limit ? Number(req.query.limit) : 10;
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        
        return LocationService.getAll(page, limit)
            .then(locations => res.json(locations))
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: "Error fetching locations" });
            });
    }

  static async create(req: Request, res: Response) {
        const name:string|undefined = req.body.name || undefined;
        const buildingId:number|undefined = Number(req.body.buildingId) || undefined;
        const status:locationStatus|undefined = req.body.status as locationStatus || undefined;
        const additionalInfo:string|undefined = req.body.additionalInfo || undefined;
        const result:Location|null = await LocationService.create({name, buildingId, status, additionalInfo})
        if(!result) return res.status(500).json({ message: "Error creating location" });
        return res.status(201).json(result)
    }
    static async getById(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid location ID" });
        const result:Location|null = await LocationService.getById(id)
        if(!result) return res.status(404).json({ message: "Location not found" });
        return res.status(200).json(result);
    }

    static async getByName(req: Request, res: Response) {
        const  name:string|undefined = req.params.name|| undefined;
        if (!name) return res.status(400).json({ message: "Invalid location Name" });
        const result:Location|null = await LocationService.getByName(name);
        if(!result) return res.status(404).json({ message: "Location not found" });
        return res.status(200).json(result);
    }
    static async update(req: Request, res: Response) {
        const id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid location ID" });
        const data:locationData = {
            name: req.body.name || undefined,
            status: req.body.status as locationStatus || undefined,
            additionalInfo: req.body.additionalInfo || undefined,
            buildingId: req.body.buildingId ? Number(req.body.buildingId) : undefined
        } ;
        const result:Location|null = await LocationService.update(id, data)
        if(!result) return res.status(404).json({ message: "Location not found" });
        return res.status(200).json(result);
    }
    static async delete(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id) || undefined;
        if (!id) return res.status(400).json({ message: "Invalid location ID" });
        const result = await LocationService.delete(id);
        if(!result) return res.status(404).json({ message: "Location not found" });
        return res.status(204).send();
    }
}

export default LocationController;