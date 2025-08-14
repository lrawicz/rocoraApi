//building Service
import { Building } from "../entity/building";
import { baseService } from "./baseService";

export type buildingData = {
    direction: string;
}
class BuildingService extends baseService<Building> {
    constructor() {
        super(Building);
    }
}
export const buildingService = new BuildingService();