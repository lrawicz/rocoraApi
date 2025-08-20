import request from "supertest";
import  app  from "../src/app"; // Adjust the path to your app file
import AppDataSource from "../src/dataSource";
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import { locationStatus } from "../src/entity/location";

let authToken: string;
const buildings:{direction: string, id?: number}[] = [{direction: "Almirante Brown 1234"}];
const locations:Partial<{id:number,name: string, buildingId: number,status:locationStatus,additionalInfo: string}>[]= 
    [{name:"AB01-T2"}];

beforeAll(async () => {
    await AppDataSource.initialize();

    // Perform login to get JWT
    const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({ username: "admin", password: "admin" });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
    authToken = loginResponse.body.token;


    const createResponse = await request(app)
            .post("/api/building")
            .set("Authorization", `Bearer ${authToken}`)
            .send(buildings[0]);
        buildings[0].id = createResponse.body.id;
        locations[0].buildingId = createResponse.body.id;
        expect(createResponse.status).toBe(201);
        expect(createResponse.body.direction).toBe(buildings[0].direction);
});

afterAll(async () => {

    await AppDataSource.destroy();
});


describe("Locations API", () => {
    it("should create a new location", async () => {
        const createResponse = await request(app)
            .post("/api/location")
            .set("Authorization", `Bearer ${authToken}`)
            .send(locations[0]);
        expect(createResponse.status).toBe(201);
        locations[0].id = createResponse.body.id;
        expect(createResponse.body.name).toBe(locations[0].name);
    });

    it("should get AB01 by ID", async () => {
        const createResponse = await request(app)
            .get(`/api/location/${locations[0].id}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send(locations[0]);
        expect(createResponse.status).toBe(200);
        expect(createResponse.body.name).toBe(locations[0].name);
        expect(createResponse.body.status).toBe("ALQUILADO");
    return;

    });
    it("should update AB01 to ABO02", async () => {
        locations[0].name = "AB02-T3";
        locations[0].status  = "ALQUILADO" as locationStatus;
        locations[0].additionalInfo = "Test location info";
        const createResponse = await request(app)
            .put(`/api/location/${locations[0].id}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send(locations[0]);
        expect(createResponse.status).toBe(200);
        expect(createResponse.body.name).toBe(locations[0].name);
        expect(createResponse.body.status).toBe(locations[0].status);
    });

    it("delete Location - AB02", async () => {
        const createResponse = await request(app)
            .delete(`/api/location/${locations[0].id}`)
            .set("Authorization", `Bearer ${authToken}`)
        expect(createResponse.status).toBe(204);
    });

    it("delete Building ", async () => {
                const createResponse = await request(app)
                .delete(`/api/building/${locations[0].buildingId}`)
                .set("Authorization", `Bearer ${authToken}`)
            expect(createResponse.status).toBe(204);
    });
});
