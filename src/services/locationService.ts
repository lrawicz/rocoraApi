//building Service
import { Building } from "../entity/building";
import { Location, locationStatus } from "../entity/location";
import { ErrorType  } from "../generalIntefaces";
import { baseService } from "./baseService";
export type locationData ={
        name:string,
        buildingId:number,
        status:locationStatus,
        additionalInfo?:string
}
class LocationService extends baseService<Location>{
    constructor(){
        super(Location)
    }
    public async create(data:locationData): Promise<Location|ErrorType> {
        const building:Building|null = await Building.findOne({where:{id:data.buildingId}})
        if(!building){
            const result:ErrorType = {
                message: "Building not found",
                statusCode: 404
            };
            return result;
        }
        return await super.create({...(data as Omit<locationData,"buildingId">),building})  
    }

    public async getByName(name: string): Promise<Location | ErrorType> {
        return await Location.findOneOrFail({ where: { name } })
        .catch(error => {
            const result:ErrorType = {message: "Error getting location",statusCode: 500};
            console.log(result.message,error);
            return result;
        })
    }
    
    public async update(id: number, data:Partial<locationData>): Promise<Location | ErrorType> {
        const dataToUpdate:Partial<Location> = {}
        if(data.buildingId){
            const building = await Building.findOne({ where: { id: data.buildingId } });
            if(!building){
                const result:ErrorType = {message: "Building not found",statusCode: 404};
                return result;
            }
            delete data.buildingId;
            dataToUpdate.building = building;
        }
        Object.assign(dataToUpdate,data)
        return super.update(id,dataToUpdate)
    }

}

export const locationService = new LocationService()