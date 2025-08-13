//location controller
import { Request, Response } from "express";
import { Location } from "../entity/location";
import { Building } from "../entity/building";

export class LocationController {
    static async getAll(req: Request, res: Response) {
    try {
        const locations:Location[] = await Location.find();
        res.json(locations);
        } catch (error) {
            res.status(500).json({ message: "Error fetching locations" });
        }
    }

  static async create(req: Request, res: Response) {
        const { name, buildingId, status, additionalInfo } = req.body;
        Building.findOneOrFail({where:{id:buildingId}})
            .then(building => {
                const newLocation = Location.create({ name, building, status, additionalInfo });
                return newLocation.save();
            })
            .then(savedLocation => res.status(201).json(savedLocation))
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: "Error creating location" });
            });
    }
    static async getById(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid location ID" });
        Location.findOneOrFail({ where: { id } }).then(location => {
            return res.status(200).json(location)
        }).catch(error => {
            res.status(404).json({ message: "Location not found" });
        });
    }

    static async getByName(req: Request, res: Response) {
        const  name:string|undefined = req.params.name|| undefined;
        if (!name) return res.status(400).json({ message: "Invalid location Name" });
        Location.findOneOrFail({ where: { name } }).then(location => {
            return res.status(200).json(location)
        }).catch(error => {
            res.status(404).json({ message: "Location not found" });
        });
    }
    static async update(req: Request, res: Response) {
        const id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid location ID" });
        const { name,  status, additionalInfo } = req.body;

        Location.findOneOrFail({ where: { id } })
        .then(async (location) => {
            if (name) location.name = name;
            if (status) location.status = status;
            if (additionalInfo) location.additionalInfo = additionalInfo;
            await location.save();
            res.json(location);
        }).catch(error => {
            res.status(404).json({ message: "Location not found" });
        });
    }

    static async delete(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id) || undefined;
        if (!id) return res.status(400).json({ message: "Invalid location ID" });
        await Location.
            findOneOrFail({ where: { id } })
            .then(async(location) => {
            if (!location) return res.status(404).json({ message: "Location not found" });
            await location.remove().then(() => {
                res.status(204).send();
            }).catch(error => {
                res.status(500).json({ message: "Error deleting location" });
            });
        })

    }
}

export default LocationController;