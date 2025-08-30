//base Service
import { Contract } from "../entity/contract";
import { ErrorType, optionsGetAll, Pagination, parameterOption } from "../generalIntefaces";
import {  LessThan, Like, MoreThan, And, FindOperator, BaseEntity, Equal, In, FindManyOptions} from "typeorm";


export class baseService<T extends BaseEntity> {
    entity:typeof BaseEntity;
    protected entityType: typeof BaseEntity & (new () => T);

    
    constructor(entityType: typeof BaseEntity & (new () => T)) {
        this.entityType = entityType;
    }
            if (filter.page < 1) filter.page = 1;
            if (filter.limit < 1) filter.limit = 10;
    public async getAll(filter: optionsGetAll<T>,relations?:string[]): Promise<Pagination<any> | ErrorType> {
            if (filter.limit > 100) filter.limit = 100; // Limit to a maximum of 100 items per page
            const result: Pagination<T> = {
                items: [],
                total: 0,
                page: filter.page,
                limit: filter.limit
            };
            try {
                const options:FindManyOptions<T> = {where:{}};
                if(filter.limit>0){
                    options.skip = (filter.page - 1) * filter.limit
                    options.take = filter.limit
                } 
                if(filter.parameterOptions) filter.parameterOptions.forEach((param:parameterOption<T>,index:number)=>
                    {
                        switch(param.typeOf){
                            case "string":
                                if(param.criteria.like)
                                    //@ts-ignore
                                    options.where[param.columnName]= Like (`%${param.criteria.like}%`)
                                
                                if(param.criteria.regex)
                                    //@ts-ignore
                                    options.where[param.columnName]= Like (param.criteria.regex) //TODO
                                
                            break
                            case "number":
                            case "date":
                                let tmp:FindOperator<Date|number>[] = []
                                if(param.criteria.max !==undefined) tmp.push(MoreThan(param.criteria.max))
                                if(param.criteria.min !==undefined) tmp.push(LessThan(param.criteria.min))
                                if( param.criteria.value !==undefined) tmp.push(Equal(param.criteria.value as number))
                                // if(param.criteria.maxOrEqual !== undefined) tmp.push(MoreThanOrEqual(param.criteria.max))
                                // if("minOrEqual" in param.criteria) tmp.push(LessThanOrEqual(param.criteria.min))
                                //@ts-ignore
                                options.where[param.columnName]= And(...tmp)
                                
                            break
                            case "enum":
                                //@ts-ignore
                                options.where[param.columnName]= In (param.criteria.in.map(String))
                            break
                            case "entity":
                                //@ts-ignore
                                options.where[param.columnName]= {id:In(param.criteria.in as number[])}
                                //@ts-ignore
                                relations[param.columnName] = true
                            break
                        }
                    }
                )
                
                await Contract.find({where:{location:true}})
                result.items = await this.entityType.find({where: {...options.where},relations,...options});
                result.total = await this.entityType.count({where: options.where});
                return result
            } catch (error) {
                const errorMessage: ErrorType = {
                    message: `Error fetching ${this.entityType.name}s`,
                    statusCode: 500
                };
                console.log(errorMessage.message, error);
                return errorMessage;
            }
        }
    public async create(data: any): Promise<T|ErrorType> {
        let result: T | ErrorType;
        try{
            const newEntity = this.entityType.create({...data});
            result = await newEntity.save();
        }catch(error){
            result = {
                message: `Error creating ${this.entityType.name}`,
                statusCode: 500
            };
            console.log(error);
        }
        return result;
    }
    public async getById(id: number): Promise<T|ErrorType> {
        // @ts-ignore
        return await this.entityType.findOneOrFail({ where: { id } })
            .catch(error => {
                return {
                    message: `${this.entityType.name} not found - ${error.name}`,
                    statusCode: 404
                };
            })
    }
    public async update(id: number,data:any): Promise<T|ErrorType> {
        // @ts-ignore
        return this.entityType.findOneOrFail({ where: { id } })
            .then(async (entity) => {
                Object.assign(entity, data);
                return await entity.save()
            })
            .catch((error) => {
                const result:ErrorType = {message: `${this.entityType.name} not found`,statusCode: 404};
                console.log(result.message,error);
                return result;
            })
    }
    
    public async hardDelete(ids: number[]): Promise<boolean|ErrorType> {
        return await this.entityType.delete(ids).then((data) => {
            if(data.affected===ids.length){
                return true;
            }else{
                const result:ErrorType = {message: `Se eliminaron ${data.affected} de un total de ${ids.length}`,statusCode: 404};
                console.log(result.message);
                return result;
            }
        }).catch(error=>{
            const result:ErrorType = {message: `Error deleting ${this.entityType.name}s`,statusCode: 404};
            console.log(result.message,error);
            return result;
        })
    }
    public async softDelete(ids: number[]): Promise<boolean|ErrorType> {
        //@ts-ignore
        const entities:T[] = await this.entityType.find({where:{id:In(ids)}})
        if(!entities){
            const result:ErrorType = {message: `Could not delete the ${this.entityType.name}s`,statusCode: 404};
            return result;
        }
        return await this.entityType.softRemove(entities)
                .then((data) => {
                    if(data.length===0){
                        const result:ErrorType = {message: `Could not delete the ${this.entityType.name}`,statusCode: 404};
                        return result;
                    }
                    return true;
                })
                .catch(error => {
                    const result:ErrorType = {message: `Could not delete the ${this.entityType.name}`,statusCode: 404};
                    console.log(result.message,error);
                    return result;
                })
            }

    }