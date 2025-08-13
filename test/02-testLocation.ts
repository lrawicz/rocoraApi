//test location
import request from "supertest";
import  app  from "../src/app"; // Adjust the path to your app file
import config from "../src/config/config";
import { AppDataSource } from "../src/data-source";
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import { locationStatus } from "../src/entity/location";

beforeAll(async () => {
    await AppDataSource.initialize();
});

afterAll(async () => {
    await AppDataSource.destroy();
});

let buildings:{direction: string, id?: number}[] = [{direction: "Almirante Brown 123"}];
let locations:Partial<{id:number,name: string, buildingId: number,status:locationStatus,additionalInfo: string}>[]= 
    [{name:"AB01"}];
describe("Locations API", () => {
    it("should create a new building", async () => {
        const createResponse = await request(app)
            .post("/api/building")
            .set("X-API-Key", config.API_KEY)
            .send(buildings[0]);
        buildings[0].id = createResponse.body.id;
        locations[0].buildingId = createResponse.body.id;
        expect(createResponse.status).toBe(201);
        expect(createResponse.body.direction).toBe("Almirante Brown 123");
    });

    it("should create a new location", async () => {
        const createResponse = await request(app)
            .post("/api/location")
            .set("X-API-Key", config.API_KEY)
            .send(locations[0]);
        expect(createResponse.status).toBe(201);
        locations[0].id = createResponse.body.id;
        expect(createResponse.body.name).toBe("AB01");
    });
    it("should get AB01 by ID", async () => {
        const createResponse = await request(app)
            .get(`/api/location/${locations[0].id}`)
            .set("X-API-Key", config.API_KEY)
            .send(locations[0]);
        expect(createResponse.status).toBe(200);
        expect(createResponse.body.name).toBe("AB01");
        expect(createResponse.body.status).toBe("ACTIVE");
    });
    it("should update AB01 to ABO02", async () => {
        locations[0].name = "AB02";
        locations[0].status = "ACTIVE";
        locations[0].additionalInfo = "Test location info";
        const createResponse = await request(app)
            .put(`/api/location/${locations[0].id}`)
            .set("X-API-Key", config.API_KEY)
            .send(locations[0]);
        expect(createResponse.status).toBe(200);
        expect(createResponse.body.name).toBe("AB02");
        expect(createResponse.body.status).toBe("ACTIVE");
    });

    it("delete Location - AB02", async () => {
        const createResponse = await request(app)
            .delete(`/api/location/${locations[0].id}`)
            .set("X-API-Key", config.API_KEY)
        expect(createResponse.status).toBe(204);
    });

    it("delete Building ", async () => {
        const createResponse = await request(app)
            .delete(`/api/building/${locations[0].buildingId}`)
            .set("X-API-Key", config.API_KEY)
        expect(createResponse.status).toBe(204);
    });
});
