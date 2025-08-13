//building Service
import { Building } from "../entity/building";
import { Location, locationStatus } from "../entity/location";
export type locationData ={
        name:string,
        buildingId:number,
        status:locationStatus,
        additionalInfo?:string
}
export class LocationService {
    static async getAll(page: number, limit:number): Promise<Location[]> {
        return await Location.find({
            skip: (page - 1) * limit,
            take: limit
        });
    }

    static async create(data: locationData): Promise<Location|null> {
        return Building.findOneOrFail({where:{id:data.buildingId}})
            .then(building => {
                const newLocation = Location.create({ ...data, building });
                return newLocation.save();
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    }

    static async getById(id: number): Promise<Location | null> {
        try {
            return await Location.findOneOrFail({ where: { id } });
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    static async getByName(name: string): Promise<Location | null> {
        try {
            return await Location.findOneOrFail({ where: { name } });
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    static async update(id: number, data:locationData): Promise<Location | null> {
        return Location.findOneOrFail({ where: { id } })
        .then(async (location) => {
            if (data.name) location.name = data.name;
            if (data.status) location.status = data.status;
            if (data.additionalInfo) location.additionalInfo = data.additionalInfo;
            if (data.buildingId){
                const building = await Building.findOneOrFail({ where: { id: data.buildingId } });
                location.building = building;
            }
            return await location.save();
        }).catch(error => {
            console.log(error);
            return null;
        });

    }

    static async delete(id: number): Promise<boolean> {
        return Location.findOneOrFail({ where: { id } })
            .then(async (location) => {
                await location.remove();
                return true;
            }).catch(error => {
                console.log(error);
                return false;
            });
    }
}