//test contract
import request from "supertest";
import  app  from "../src/app"; // Adjust the path to your app file
import config from "../src/config/config";
import AppDataSource from "../src/dataSource";
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import { locationStatus } from "../src/entity/location";
import { taskAmount } from "../src/entity/contract";

beforeAll(async () => {
    await AppDataSource.initialize();
        // Perform login to get JWT
    const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({ username: "admin", password: "admin" });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
    authToken = loginResponse.body.token;

});

afterAll(async () => {
    await AppDataSource.destroy();
});

let authToken: string;
const buildings:{direction: string, id?: number}[] = [{direction: "Almirante Brown 123"}];
const locations:Partial<{id:number,name: string, buildingId: number,status:locationStatus,additionalInfo: string}>[]= 
    [{name:"AB01-T"}];
const contracts:Partial<{
    id:number,
    tenant:string,
    tenantDNI:string,
    startDate:Date,
    endDate:Date,
    sheduleAmount:taskAmount[],
    locationId:number,
    status:string
}>[] =
    [
        {   
            //id: to be defined
            tenant:"John Doe",
            tenantDNI:"12345678",
            startDate:new Date(2024,0,1),
            endDate:new Date(2025,11,31),
            sheduleAmount:[
                {amount:1000, startDate:new Date(2024,0,1), months:12},
                {amount:1000, startDate:new Date(2025,0,1), months:12}
            ],
            //locationId: to be defined
        }
    ];
        
describe("Contract API", () => {
    it("should create a new building", async () => {
        const createResponse = await request(app)
            .post("/api/building")
            .set("Authorization", `Bearer ${authToken}`)
            .send(buildings[0]);
        expect(createResponse.status).toBe(201);
        buildings[0].id = createResponse.body.id;
        locations[0].buildingId = createResponse.body.id;
        expect(createResponse.body.direction).toBe("Almirante Brown 123");
    });
    it("should create a new location", async () => {
        const createResponse = await request(app)
            .post("/api/location")
            .set("Authorization", `Bearer ${authToken}`)
            .send(locations[0]);
        expect(createResponse.status).toBe(201);
        locations[0].id = createResponse.body.id;
        contracts[0].locationId = createResponse.body.id;
        expect(createResponse.body.name).toBe(locations[0].name);
    });

    it("should create a new contract", async () => {
        const createResponse = await request(app)
            .post("/api/contract")
            .set("Authorization", `Bearer ${authToken}`)
            .send(contracts[0]);
        expect(createResponse.status).toBe(201);
        contracts[0].id = createResponse.body.id;
        expect(createResponse.body.tenant).toBe(contracts[0].tenant);
        expect(createResponse.body.tenantDNI).toBe(contracts[0].tenantDNI);
        expect(createResponse.body.startDate).toBe(contracts[0].startDate.toISOString());
        expect(createResponse.body.endDate).toBe(contracts[0].endDate.toISOString());
        //expect(createResponse.body.sheduleAmount as taskAmount[]).toBe(contracts[0].sheduleAmount);
        expect(createResponse.body.location.id).toBe(contracts[0].locationId);
    })
    it("should get all contracts", async () => {
        const getResponse = await request(app)
            .get("/api/contract")
            .set("Authorization", `Bearer ${authToken}`)
        expect(getResponse.status).toBe(200);
    })
    it("should get contract by id", async () => {
        const getResponse = await request(app)
            .get(`/api/contract/${contracts[0].id}`)
            .set("Authorization", `Bearer ${authToken}`)
        expect(getResponse.status).toBe(200);
        expect(getResponse.body.tenant).toBe(contracts[0].tenant);
        expect(getResponse.body.tenantDNI).toBe(contracts[0].tenantDNI);
    })
    it("should get contracts by LocationID", async () => {
        const getResponse = await request(app)
            .get(`/api/contract/getByLocationId/${contracts[0].locationId}`)
            .set("Authorization", `Bearer ${authToken}`)
        expect(getResponse.status).toBe(200);
        expect(getResponse.body.length).toBeGreaterThan(0);
        expect(getResponse.body[0].tenant).toBe(contracts[0].tenant);
        expect(getResponse.body[0].tenantDNI).toBe(contracts[0].tenantDNI);
    })
    it("should update the contract", async () => {
        contracts[0].tenant = "Jane Smith";
        contracts[0].tenantDNI = "87654321";
        const getResponse = await request(app)
            .put(`/api/contract/${contracts[0].id}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send(contracts[0]);
        expect(getResponse.status).toBe(200);
        expect(getResponse.body.tenant).toBe(contracts[0].tenant);
        expect(getResponse.body.tenantDNI).toBe(contracts[0].tenantDNI);
    })
    it("get Total Debt the contract", async () => {
        const getDebt = await request(app)
            .get(`/api/contract/getTotalDebt/${locations[0].id}`)
            .set("Authorization", `Bearer ${authToken}`)
    })
    it("delete the contract", async () => {
        const deleteResponse = await request(app)
            .delete(`/api/contract/${contracts[0].id}`)
            .set("Authorization", `Bearer ${authToken}`)
        expect(deleteResponse.status).toBe(204);
        const getResponse = await request(app)
            .get(`/api/contract/${contracts[0].id}`)
            .set("Authorization", `Bearer ${authToken}`)
        expect(getResponse.status).toBe(404);
    })
    it("delete Location - AB01", async () => {
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
