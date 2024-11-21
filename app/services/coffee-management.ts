import { CustomError } from "../utils/custom-error-feedback";
import { CoffeeModel } from "../models/coffee";
import { CoffeeDao, ICoffeerDao } from "../repositories/coffee-dao";

export interface ICoffeerManagement{
    createCoffee(coffee:CoffeeModel):Promise<CoffeeModel>;
    updateCoffee(coffee:CoffeeModel):Promise<CoffeeModel>;
    getCoffeeById(id: string): Promise<CoffeeModel | undefined>;
    deleteCoffee(id:string):Promise<boolean>;
    listAllCoffees():Promise<CoffeeModel[]>;
}

export class CoffeeManagement implements ICoffeerManagement{
    private coffeeDao:ICoffeerDao;
    constructor(){
        this.coffeeDao = new CoffeeDao()
    }

   async createCoffee(coffee: CoffeeModel): Promise<CoffeeModel> {
        if(!coffee){
            console.error(`❌ Invalid coffee data provided! data: ${JSON.stringify(coffee)}`);
            throw new CustomError(400, `❌ Invalid coffee data provided! data: ${JSON.stringify(coffee)}`);
        }
        try {
            const response = await this.coffeeDao.createCoffee(coffee)
            return response
        } catch (error:any) {
            console.error(`❌ Error to create coffee in firestore, error: ${JSON.stringify(error.message)}`);
            throw new CustomError(400, `❌ Error to create coffee in firestore, error: ${JSON.stringify(error.message)}`);
        }
    }

   async  updateCoffee(coffee: CoffeeModel): Promise<CoffeeModel> {
        if(!coffee){
            console.error(`❌ Invalid coffee data provided! data: ${JSON.stringify(coffee)}`);
            throw new CustomError(400, `❌ Invalid coffee data provided! data: ${JSON.stringify(coffee)}`);
        }
        try {
            const itemCoffee = await this.coffeeDao.updateCoffee(coffee)
            return itemCoffee
        } catch (error:any) {
            console.error(`❌ Error to create coffee in firestore, error: ${JSON.stringify(error.message)}`);
            throw new CustomError(400, `❌ Error to create coffee in firestore, error: ${JSON.stringify(error.message)}`);
        }
    }
    async getCoffeeById(id: string): Promise<CoffeeModel | undefined> {
        if(!id){
            console.error(`❌ Invalid coffee data provided! id: ${id}`);
            throw new CustomError(400, `❌ Invalid coffee data provided!  id: ${id}`);
        }
        try {
            const itemCoffee = await this.coffeeDao.getCoffeeById(id)
            return itemCoffee
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }
    async deleteCoffee(id: string): Promise<boolean> {
        if(!id){
            console.error(`❌ Invalid coffee data provided! id: ${id}`);
            throw new CustomError(400, `❌ Invalid coffee data provided!  id: ${id}`);
        }
        console.log(`🔁 Initing process delete a coffee by id: ${id}`)
        try {
            const response = await this.coffeeDao.deleteCoffee(id)
            return true
        } catch (error:any) {
            return false
        }
    }
    async listAllCoffees():Promise<CoffeeModel[]>{
        try {
            const response = await this.coffeeDao.listAllCoffees()
            return response
        } catch (error:any) {
            console.error(`❌ Erro to query all coffees, error: ${error.message}`)
            throw new CustomError(500, `❌ Erro to query all coffees, error: ${error.message}`);
        }
    }
}