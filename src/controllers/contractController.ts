//contract controller
import { Request, Response } from "express";
import { Contract, taskAmount } from "../entity/contract";
import { Location } from "../entity/location";
import { MoreThanOrEqual } from "typeorm";

export class ContractController {
    static async getAll(req: Request, res: Response) {
    try {
        const contracts:Contract[] = await Contract.find({relations: {location: true} });
        res.json(contracts);
        } catch (error) {
            res.status(500).json({ message: "Error fetching contracts" });
        }
    }

    static async create(req: Request, res: Response) {
        const locationId:number|undefined= Number(req.body.locationId)||undefined
        if(locationId===undefined) return res.status(400).json({ message: "Invalid location ID" });

        const tenant:string|null = req.body.tenant? req.body.tenant : null
        const tenantDNI:number|null = Number(req.body.tenantDNI)||null
        const startDate:Date|null = req.body.startDate? req.body.startDate : null
        const endDate:Date|null  = req.body.endDate? req.body.endDate : null
        const sheduleAmount:taskAmount[]|null = req.body.sheduleAmount ? req.body.sheduleAmount : null
        const status:string|null  = req.body.status? req.body.status : null
        
        Location.findOneOrFail({where:{id:locationId}})
            .then(location => {
                const newContract = Contract.create({ tenant, tenantDNI, startDate, endDate, sheduleAmount, location:location, status });
                return newContract.save();
            })
            .then(savedContract => res.status(201).json(savedContract))
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: "Error creating contract" });
            });
    }
    static async getById(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid contract ID" });
        Contract.findOneOrFail({ where: { id },relations: {location: true} }).then(contract => {
            return res.status(200).json(contract)
        }).catch(error => {
            res.status(404).json({ message: "Contract not found" });
        });
    }

    static async getByLocationId(req: Request, res: Response) {
        const id:number|undefined = Number(req.params.id)|| undefined;
        const startDate:Date|undefined = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
        if (!id) return res.status(400).json({ message: "Invalid location Id" });
        Location.findOneOrFail({ where: { id } }).then(location => {
            // if (startDate) {
            //     return Contract.find({ where: { location, startDate:MoreThanOrEqual(startDate)}})
            //         .then(contracts => res.status(200).json(contracts))
            //         .catch(error => res.status(404).json({ message: "Contracts not found for this location" }));
            // }
            return Contract.find({ where: { location } })
                .then(contracts => res.status(200).json(contracts))
                .catch(error => res.status(404).json({ message: "Contracts not found for this location" }));
        }).catch(error => {
            console.log(error);
            res.status(404).json({ message: "Location not found" });
        });
    }
    static async update(req: Request, res: Response) {
        const id:number|undefined = Number(req.params.id)|| undefined;
        if (!id) return res.status(400).json({ message: "Invalid contract ID" });
        const tenant:string|undefined = req.body.tenant? req.body.tenant : undefined
        const tenantDNI:number|undefined = Number(req.body.tenantDNI)||undefined
        const startDate:Date|undefined = req.body.startDate? req.body.startDate : undefined
        const endDate:Date|undefined  = req.body.endDate? req.body.endDate : undefined
        const sheduleAmount:taskAmount[]|undefined = req.body.sheduleAmount? req.body.sheduleAmount : undefined
        const status:string|undefined  = req.body.status ? req.body.status : undefined
        const locationId:number|undefined= Number(req.body.locationId)||undefined
        Contract.findOneOrFail({ where: { id } })
        .then(async (contract) => {
            if (tenant) contract.tenant =  tenant;
            if (tenantDNI) contract.tenantDNI =  tenantDNI;
            if (startDate) contract.startDate =  startDate;
            if (endDate) contract.endDate =  endDate
            if (sheduleAmount) contract.sheduleAmount =  sheduleAmount;
            if (locationId) {
                const location = await Location.findOneOrFail({ where: { id: locationId } });
                contract.location = location;
            }
            if (status) contract.status = status;
            await contract.save();
            res.json(contract);
        }).catch(error => {
            res.status(404).json({ message: "Contract not found" });
        });
    }
    static async delete(req: Request, res: Response) {
        const  id:number|undefined = Number(req.params.id) || undefined;
        if (!id) return res.status(400).json({ message: "Invalid contract ID" });
        await Contract.
            findOneOrFail({ where: { id } })
            .then(async(contract) => {
            if (!contract) return res.status(404).json({ message: "Contract not found" });

            await contract.remove().then(() => {
                res.status(204).send();
            }).catch(error => {
                res.status(500).json({ message: "Error deleting location" });
            });
        })

    }
}

export default ContractController;