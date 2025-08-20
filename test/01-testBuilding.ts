import request from "supertest";
import  app  from "../src/app"; // Adjust the path to your app file
import AppDataSource from "../src/dataSource";
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';

let authToken: string;
let buildingIds: number[] = [];

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


describe("Building API", () => {
    // Test for successful creation with a valid API Key
    it("should create a new building", async () => {
        const createResponse = await request(app)
            .post("/api/building")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ direction: "123 Main St" });
        buildingIds.push(createResponse.body.id)
        expect(createResponse.status).toBe(201);
        expect(createResponse.body.direction).toBe("123 Main St");
    });
    it("should get all buildings", async () => {
        const getAllResponse = await request(app)
            .get("/api/building")
            .set("Authorization", `Bearer ${authToken}`);
        expect(getAllResponse.status).toBe(200);
        //expect(Array.isArray(getAllResponse.body)).toBe(true);
    });

    it("should get a building by ID", async () => {
        const getIdResponse = await request(app)
            .get(`/api/building/${buildingIds[0]}`)
            .set("Authorization", `Bearer ${authToken}`);
        expect(getIdResponse.status).toBe(200);
        expect(getIdResponse.body.id).toBe(buildingIds[0]);
    }
    );
    
    it("should update a building", async () => {
        const updateResponse = await request(app)
            .put(`/api/building/${buildingIds[0]}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send({ direction: "789 Oak St Updated" });
        expect(updateResponse.status).toBe(200);
        
        const getIdResponse = await request(app)
            .get(`/api/building/${buildingIds[0]}`)
            .set("Authorization", `Bearer ${authToken}`);
        expect(getIdResponse.status).toBe(200);
        expect(getIdResponse.body.direction).toBe("789 Oak St Updated");
    }
    );
    it("should delete all the building", async () => {
        const response = await request(app)
            .delete(`/api/building/${buildingIds[0]}`)
            .set("Authorization", `Bearer ${authToken}`);
        expect(response.status).toBe(204);
        
        // Verify deletion
        const getResponse = await request(app)
            .get(`/api/building/${buildingIds[0]}`)
            .set("Authorization", `Bearer ${authToken}`);
        expect(getResponse.status).toBe(404);
    }
    );
});
