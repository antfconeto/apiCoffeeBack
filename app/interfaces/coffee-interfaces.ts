export interface Coffee{
    id:string,
    name:string,
    description:string,
    createdAt:string,
    entity:string,
    updatedAt:string,
    price:number
}
export interface CoffeeImage{
    id:string,
    coffeeId:string,
    url:string,
    width:number,
    height:number,
    altText:string
    entity:string
}