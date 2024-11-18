import { randomUUID } from "crypto";
import { Coffee } from "../interfaces/coffee-interfaces";

export class CoffeeModel{
    name:string;
    description:string;
    price:number;
    id:string;
    createdAt:string;
    updatedAt:string;
    constructor(id?:string,name?:string,description?:string,price?:number,createdAt?:string,updatedAt?:string){
        this.id = id || randomUUID()
        this.name = name || ''
        this.description = description || ''
        this.price = price || 0
        this.createdAt = createdAt || this.dateNow
        this.updatedAt = updatedAt || this.dateNow
    }

    get dateNow():string{
        return new Date().toISOString()
    }
    get data():Coffee{
        return {
            id:this.id,
            name:this.name,
            createdAt:this.createdAt,
            description:this.description,
            updatedAt:this.updatedAt,
            price:this.price
        }
    }
}
