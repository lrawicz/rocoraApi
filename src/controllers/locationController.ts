//location controller
import { Request, Response } from "express";
import { Location } from "../entity/location";
import { Building } from "../entity/building";

export class LocationController {
    static async getAllLocations(req: Request, res: Response) {
    try {
        const locations:Location[] = await Location.find();
        res.json(locations);
        } catch (error) {
            res.status(500).json({ message: "Error fetching locations" });
        }
    }

  static async createLocation(req: Request, res: Response) {
        const { name, buildingId } = req.body;
        Building.findOneOrFail(buildingId)
            .then(building => {
                const newLocation = Location.create({ name, building });
                return newLocation.save();
            })
            .then(savedLocation => res.status(201).json(savedLocation))
            .catch(error => {
                res.status(500).json({ message: "Error creating location" });
            });
    }
    static async getLocationByName(req: Request, res: Response) {
        const { name } = req.params;
        Location.findOneOrFail({ where: { name } }).then(location => {
            return location;
        }).catch(error => {
            res.status(404).json({ message: "Location not found" });
        });
    }

    static async updateLocation(req: Request, res: Response) {
        const old_name:string = req.params.name;
        const { name, buildingId } = req.body;
        Location.findOneOrFail({ where: { name: old_name } })
        .then(async (location) => {
            if (name) location.name = name;
            if (buildingId) {
                Building.findOneOrFail(buildingId).then(building => {
                    if (!building)
                        return res.status(404).json({ message: "Building not found" });
                }).catch(error => {
                    return res.status(404).json({ message: "Building not found" });
                });
            }
            await location.save();
            res.json(location);
        }).catch(error => {
            res.status(404).json({ message: "Location not found" });
        });
    }

    static async deleteLocation(req: Request, res: Response) {
        const { name } = req.params;
        await Location.
        findOneOrFail({ where: { name } })
        .then(async(location) => {
            if (!location) return res.status(404).json({ message: "Location not found" });

            await location.remove().then(() => {
                res.status(200).json({ message: "Location deleted successfully" });
            }).catch(error => {
                res.status(500).json({ message: "Error deleting location" });
            });
        })

    }
}

export default LocationController;