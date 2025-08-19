//test building
import request from "supertest";
import  app  from "../src/app"; // Adjust the path to your app file
import config from "../src/config/config";
import AppDataSource from "../src/dataSource";
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';

beforeAll(async () => {
    await AppDataSource.initialize();
});

afterAll(async () => {
    await AppDataSource.destroy();
});

let buildingIds: number[] = [];

describe("Building API", () => {
    // Test for unauthorized access (no API Key)
    it("should return 401 Unauthorized when creating a building without an API key", async () => {
        const createResponse = await request(app)
            .post("/api/building")
            .send({ direction: "123 Unauthorized St" });
        expect(createResponse.status).toBe(401);
    });

    // Test for forbidden access (invalid API Key)
    it("should return 403 Forbidden when creating a building with an invalid API key", async () => {
        const createResponse = await request(app)
            .post("/api/building")
            .set("X-API-Key", "invalid-api-key")
            .send({ direction: "456 Forbidden St" });
        expect(createResponse.status).toBe(403);
    });

    // Test for successful creation with a valid API Key
    it("should create a new building", async () => {
        const createResponse = await request(app)
            .post("/api/building")
            .set("X-API-Key", config.API_KEY)
            .send({ direction: "123 Main St" });
        buildingIds.push(createResponse.body.id)
        expect(createResponse.status).toBe(201);
        expect(createResponse.body.direction).toBe("123 Main St");
    });
    it("should get all buildings", async () => {
        const getAllResponse = await request(app).get("/api/building");
        expect(getAllResponse.status).toBe(200);
        //expect(Array.isArray(getAllResponse.body)).toBe(true);
    });

    it("should get a building by ID", async () => {
        const getIdResponse = await request(app).get(`/api/building/${buildingIds[0]}`);
        expect(getIdResponse.status).toBe(200);
        expect(getIdResponse.body.id).toBe(buildingIds[0]);
    }
    );
    
    it("should update a building", async () => {
        const updateResponse = await request(app)
            .put(`/api/building/${buildingIds[0]}`)
            .set("X-API-Key", config.API_KEY)
            .send({ direction: "789 Oak St Updated" });
        expect(updateResponse.status).toBe(200);
        
        const getIdResponse = await request(app).get(`/api/building/${buildingIds[0]}`);
        expect(getIdResponse.status).toBe(200);
        expect(getIdResponse.body.direction).toBe("789 Oak St Updated");
    }
    );
    it("should delete all the building", async () => {
        const response = await request(app).delete(`/api/building/${buildingIds[0]}`)
            .set("X-API-Key", config.API_KEY);
        expect(response.status).toBe(204);
        
        // Verify deletion
        const getResponse = await request(app).get(`/api/building/${buildingIds[0]}`);
        expect(getResponse.status).toBe(404);
    }
    );
});
