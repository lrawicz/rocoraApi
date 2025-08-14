export type Pagination<T> ={
    items: T[];
    total: number;
    page: number;
    limit: number;
}
export type ErrorType = {
    message: string;
    statusCode: number;
}

export type parameterOption = {
    columnName:string,
    typeOf:"string"|"number"|"boolean"|"date",
    criteria:{
        min?:number|Date;
        minOrEqual?:number|Date;
        max?:number|Date;
        maxOrEqual?:number|Date;
        value?:string|number|boolean
    },    
}
export type optionsGetAll = {
    parameterOptions?:parameterOption[]
    page:number,
    limit:number
}
