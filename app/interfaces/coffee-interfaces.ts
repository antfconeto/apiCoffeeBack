export interface Coffee{
    id:string,
    name:string,
    description:string,
    createdAt:string,
    updatedAt:string,
    price:number
}
export interface CoffeeImage{
    id:string,
    coffeeId:string,
    url:string,
    width:number,
    heigth:number,
    altText:string
}