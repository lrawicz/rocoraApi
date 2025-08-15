//test payment
import request from "supertest";
import  app  from "../src/app"; // Adjust the path to your app file
import config from "../src/config/config";
import { AppDataSource } from "../src/data-source";
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import { locationStatus } from "../src/entity/location";
import { taskAmount } from "../src/entity/contract";

beforeAll(async () => {
    await AppDataSource.initialize();
});

afterAll(async () => {
    await AppDataSource.destroy();
});

const buildings:{direction: string, id?: number}[] = [{direction: "Almirante Brown 123"}];
const locations:Partial<{id:number,name: string, buildingId: number,status:locationStatus,additionalInfo: string}>[]= 
    [{name:"AB01"}];
const contracts:Partial<{
        id:number,
        tenant:string,
        tenantDNI:number,
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
            tenantDNI:12345678,
            startDate:new Date(2024,0,1),
            endDate:new Date(2025,11,31),
            sheduleAmount:[
                {amount:1000, startDate:new Date(2024,0,1), months:12},
                {amount:1000, startDate:new Date(2025,0,1), months:12}
            ],
            //locationId: to be defined
        }
    ];
        
const payments:{
        date:Date,
        amount:number,
        contractId?:number
        id?:number
    }[] = [{
        date: new Date(),
        amount: 1000,
        //contractId: [to be set]
        //id: [to be set]
    },
    {
        date: new Date(),
        amount: 3000,
        //contractId: [to be set]
        //id: [to be set]
    }
    ]
    describe("Contract API", () => {
    it("create required entities", async () => {
        //building
        const createBuilding = await request(app)
            .post("/api/building")
            .set("X-API-Key", config.API_KEY)
            .send(buildings[0]);
        buildings[0].id = createBuilding.body.id;
        locations[0].buildingId = createBuilding.body.id;
        expect(createBuilding.status).toBe(201);
        expect(createBuilding.body.direction).toBe("Almirante Brown 123");

        //location
        const createLocation = await request(app)
            .post("/api/location")
            .set("X-API-Key", config.API_KEY)
            .send(locations[0]);
        expect(createLocation.status).toBe(201);
        locations[0].id = createLocation.body.id;
        contracts[0].locationId = createLocation.body.id;
        expect(createLocation.body.name).toBe("AB01");

        //contract
        const createContract = await request(app)
            .post("/api/contract")
            .set("X-API-Key", config.API_KEY)
            .send(contracts[0]);
        expect(createContract.status).toBe(201);
        contracts[0].id = createContract.body.id;
        payments[0].contractId = createContract.body.id
        payments[1].contractId = createContract.body.id
        expect(createContract.body.tenant).toBe(contracts[0].tenant);
        expect(createContract.body.tenantDNI).toBe(contracts[0].tenantDNI);
        expect(createContract.body.startDate).toBe(contracts[0].startDate.toISOString());
        expect(createContract.body.endDate).toBe(contracts[0].endDate.toISOString());
        //expect(createResponse.body.sheduleAmount as taskAmount[]).toBe(contracts[0].sheduleAmount);
        expect(createContract.body.location.id).toBe(contracts[0].locationId);
        expect(createContract.body.status).toBe("ACTIVE");
    });


    it("create 2 payments", async () => {
        const createPayment01 = await request(app)
            .post("/api/payment")
            .set("X-API-Key", config.API_KEY)
            .send(payments[0]);
        
        payments[0].id = createPayment01.body.id;
        expect(createPayment01.status).toBe(201);

        const createPayment02 = await request(app)
            .post("/api/payment")
            .set("X-API-Key", config.API_KEY)
            .send(payments[1]);
        payments[1].id = createPayment02.body.id;
        expect(createPayment02.status).toBe(201);
        console.log("////////////")
        console.log(createPayment01.body)
        console.log(createPayment02.body)
    })

    it("delete 2 payments", async () => {
        console.log("////////////")
        console.log(payments.map((item)=>item.id))
        const createPayment01 = await request(app)
            .delete(`/api/payment/${payments[0].id}`)
            .set("X-API-Key", config.API_KEY)
            .send(payments[0]);
        expect(createPayment01.status).toBe(204);

        const createPayment02 = await request(app)
            .delete(`/api/payment/${payments[1].id}`)
            .set("X-API-Key", config.API_KEY)
            .send(payments[1]);
        expect(createPayment02.status).toBe(204);
    })

    it("delete required entities", async () => {
        console.log(contracts[0].id)
        const deleteContractResp = await request(app)
            .delete(`/api/contract/${contracts[0].id}`)
            .set("X-API-Key", config.API_KEY);
        expect(deleteContractResp.status).toBe(204);

        const deleteLocationResp = await request(app)
            .delete(`/api/location/${locations[0].id}`)
            .set("X-API-Key", config.API_KEY)
        expect(deleteLocationResp.status).toBe(204);

        const deleteBuilding = await request(app)
            .delete(`/api/building/${buildings[0].id}`)
            .set("X-API-Key", config.API_KEY)
        expect(deleteBuilding.status).toBe(204);
    })

});
