import { randomUUID } from "crypto";
import { CoffeeImage } from "../interfaces/coffee-interfaces";

export class CoffeeImageModel{
    id:string;
    coffeeId:string;
    width:number;
    heigth:number;
    altText:string;
    url:string
    constructor(coffeeId:string, id?:string,width?:number, heigth?:number, altTex?:string, url?:string){
        this.coffeeId = coffeeId;
        this.id = id || randomUUID();
        this.width = width || 0;
        this.heigth = heigth || 0;
        this.altText = altTex || '';
        this.url = url || '';
    }

    get dateNow():string{
        return new Date().toISOString()
    }
    get data():CoffeeImage{
        return {
            coffeeId:this.coffeeId,
            id:this.id,
            altText:this.altText,
            heigth:this.heigth,
            url:this.url,
            width:this.width
        }
    }
    static fromInput(data:CoffeeImage):CoffeeImageModel{
        console.log(`🔁 Parsing coffee image input to Coffee Image Model`);
        const {coffeeId,id,width,heigth,altText,url} = data
        return new CoffeeImageModel(coffeeId,id,width,heigth,altText,url)
    }
}
