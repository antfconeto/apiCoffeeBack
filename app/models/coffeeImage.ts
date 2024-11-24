import { randomUUID } from "crypto";
import { CoffeeImage } from "../interfaces/coffee-interfaces";

export class CoffeeImageModel{
    id:string;
    coffeeId:string;
    width:number;
    height:number;
    altText:string;
    url:string
    entity:string;
    constructor(coffeeId:string, id?:string,width?:number, height?:number, altTex?:string, url?:string){
        this.coffeeId = coffeeId;
        this.id = id || `COFFEEIMAGE${randomUUID()}`;
        this.width = width || 0;
        this.height = height || 0;
        this.altText = altTex || '';
        this.url = url || '';
        this.entity = 'COFFEEIMAGE';
    }

    get dateNow():string{
        return new Date().toISOString()
    }
    get data():CoffeeImage{
        return {
            coffeeId:this.coffeeId,
            id:this.id,
            altText:this.altText,
            height:this.height,
            url:this.url,
            width:this.width,
            entity:this.entity
        }
    }
    static fromInput(data:CoffeeImage):CoffeeImageModel{
        console.log(`🔁 Parsing coffee image input to Coffee Image Model`);
        const {coffeeId,id,width,height,altText,url} = data
        return new CoffeeImageModel(coffeeId,id,width,height,altText,url)
    }
}
