//location controller
import { Request, Response } from "express";
import { Building } from "../entity/building";

export class BuildingController {
    static async getAllBuildings(req: Request, res: Response) {
        try {
            const locations = await Building.find();
            res.json(locations);
        } catch (error) {
            res.status(500).json({ message: "Error fetching locations" });
        }
    }

    static async createBuilding(req: Request, res: Response) {
        const { direction } = req.body;
        try {
            const newLocation = Building.create({direction});
            await newLocation.save();
            res.status(201).json(newLocation);
        } catch (error) {
            res.status(500).json({ message: "Error creating location" });
        }
    }
    static async getBuildingById(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        console.log("Requested Building ID:", id); // Debugging line
        if (!id) return res.status(400).json({ message: "Invalid building ID" });

        try {
            const building = await Building.findOneOrFail({ where: { id } });
            res.json(building);
        } catch (error) {
            res.status(404).json({ message: "Building not found" });
        }
    }

    static async updateBuilding(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid building ID" });

        const { direction } = req.body;
        try {
            const building = await Building.findOneOrFail({ where: { id } });
            if (direction) building.direction = direction;
            await building.save();
            res.json(building);
        } catch (error) {
            res.status(404).json({ message: "Building not found" });
        }
    }

    static async deleteBuilding(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid building ID" });

        try {
            const building = await Building.findOneOrFail({ where: { id } });
            await building.remove();
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: "Building not found" });
        }
    }
}

export default BuildingController;