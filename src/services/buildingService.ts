//building Service
import { resourceLimits } from "worker_threads";
import { Building } from "../entity/building";
import { ErrorType, Pagination } from "../generalIntefaces";
import { error } from "console";

export type buildingData = {
    direction: string;
}
export class BuildingService {
    static async getAll(page: number, limit:number): Promise<Pagination<Building>| ErrorType> {
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        if (limit > 100) limit = 100; // Limit to a maximum of 100 items per page
        let result: Pagination<Building> = {
            items: [],
            total: 0,
            page: page,
            limit: limit
        };
        try {
            result.items = await Building.find({skip: (page - 1) * limit,take: limit});
            result.total = await Building.count();
            return result
        } catch (error) {
            const errorMessage: ErrorType = {
                message: "Error fetching buildings",
                statusCode: 500
            };
            console.log(errorMessage.message, error);
            return errorMessage;
        }
    }

    static async create(direction: string): Promise<Building|ErrorType> {
        let result: Building | ErrorType;
        try{
            const newBuilding = Building.create({ direction });
            result = await newBuilding.save();
        }catch(error){
            result = {
                message: "Error creating building",
                statusCode: 500
            };
            console.log(result.message);
            console.log(error);
        }
        return result;
    }

    static async getById(id: number): Promise<Building | ErrorType> {
        return await Building.findOneOrFail({ where: { id } })
            .catch(error => {
                console.log("Building not found",error);
                return {
                    message: "Building not found",
                    statusCode: 404
                };
            })
    }

    static async update(id: number, data: Partial<buildingData>): Promise<Building | ErrorType> {
        return Building.findOneOrFail({ where: { id } })
            .then(async (building) => {
                Object.assign(building, data);
                console.log("Building updated successfully");
                console.log(building)
                return await building.save()
            })
            .catch((error) => {
                const result:ErrorType = {message: "Building not found",statusCode: 404};
                console.log(result.message,error);
                return result;
            })
    }

    static async delete(id: number): Promise<boolean|ErrorType> {
        return await Building.delete(id)
            .then((data) => {
                if(data.affected===0){
                    const result:ErrorType = {message: "Could not delete the building",statusCode: 404};
                    return result;
                }
                return true;
            })
            .catch(error => {
                console.log("--------------")
                console.log(error)
                const result:ErrorType = {message: "Could not delete the building",statusCode: 404};
                console.log(result.message,error);
                return result;
            })
        }
}