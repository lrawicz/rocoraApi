//building Service
import { Building } from "../entity/building";

export class BuildingService {
    static async getAllBuildings(page: number, limit:number): Promise<Building[]> {
        return await Building.find({
            skip: (page - 1) * limit,
            take: limit
        });
    }

    static async createBuilding(direction: string): Promise<Building> {
        try{
            const newBuilding = Building.create({ direction });
            return await newBuilding.save();
        }catch(error){
            console.log(error);
            return null;
        }
    }

    static async getBuildingById(id: number): Promise<Building | null> {
        try {
            return await Building.findOneOrFail({ where: { id } });
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    static async updateBuilding(id: number, direction?: string): Promise<Building | null> {
        try {
            const building = await Building.findOneOrFail({ where: { id } });
            if (direction) building.direction = direction;
            await building.save();
            return building;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    static async deleteBuilding(id: number): Promise<boolean> {
        try {
            const building = await Building.findOneOrFail({ where: { id } });
            await building.remove();
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}