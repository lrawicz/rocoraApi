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

export type parameterOption<T> = {
    columnName: keyof T,
    typeOf:"string"|"number"|"boolean"|"date"|"entity"|"enum",
    criteria:{
        in?:number[]|string[],
        min?:number|Date;
        max?:number|Date;
        regex?:string;
        like?:string;
        value?:string|number;

        //minOrEqual?:number|Date;
        //maxOrEqual?:number|Date;
    },    
}
export type optionsGetAll<T> = {
    parameterOptions?:parameterOption<T>[]
    page:number,
    limit:number
}
