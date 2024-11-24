import { firestore} from "firebase-admin";
import { Coffee } from "../interfaces/coffee-interfaces";
import { CustomError } from "../utils/custom-error-feedback";
import { FirebaseConfigFactory, FirebaseService, IFirebaseService } from "../.firebase/firebase-setup";
import { CoffeeModel } from "../models/coffee";

export interface ICoffeerDao{
    createCoffee(coffee:CoffeeModel):Promise<CoffeeModel>;
    updateCoffee(coffee:CoffeeModel):Promise<CoffeeModel>;
    getCoffeeById(id: string): Promise<CoffeeModel | undefined>;
    deleteCoffee(id:string):Promise<boolean>;
    listAllCoffees():Promise<CoffeeModel[]>;
}

export class CoffeeDao implements ICoffeerDao{
    private database:firestore.Firestore
    private firebaseService:IFirebaseService
    constructor(){
        this.firebaseService = new FirebaseService(FirebaseConfigFactory.createConfig())
        this.database = this.firebaseService.getDatabase()
    }

   async createCoffee(coffee: CoffeeModel): Promise<CoffeeModel> {
        if(!coffee){
            console.error(`❌ Invalid coffee data provided! data: ${JSON.stringify(coffee)}`);
            throw new CustomError(400, `❌ Invalid coffee data provided! data: ${JSON.stringify(coffee)}`);
        }
        console.log(`🔁 Initing process create a coffee, data: ${JSON.stringify(coffee)}`)
        try {
            const response = await this.database.collection('coffee').doc(coffee.id)
            response.set(coffee.data)
            console.info(`✅ Created a new coffee with success`);
            return coffee
        } catch (error:any) {
            throw new CustomError(500, error.message);
        }
    }

   async  updateCoffee(coffee: CoffeeModel): Promise<CoffeeModel> {
        if(!coffee){
            console.error(`❌ Invalid coffee data provided! data: ${JSON.stringify(coffee)}`);
            throw new CustomError(400, `❌ Invalid coffee data provided! data: ${JSON.stringify(coffee)}`);
        }
        console.log(`🔁 Initing process update a coffee, data: ${JSON.stringify(coffee)}`)
        try {
            coffee.updatedAt = new Date().toISOString()
            const itemCoffee = await this.database.collection('coffee').doc(coffee.id)
            await itemCoffee.set(coffee.data)
            console.log(`✅ Updated coffee with success`)
            return coffee
        } catch (error:any) {
            throw new CustomError(500, error.message);
        }
    }
    async getCoffeeById(id: string): Promise<CoffeeModel | undefined> {
        if(!id){
            console.error(`❌ Invalid coffee data provided! id: ${id}`);
            throw new CustomError(400, `❌ Invalid coffee data provided!  id: ${id}`);
        }
        console.log(`🔁 Initing process get a coffee by id: ${id}`)
        try {
            const itemCoffee = await this.database.collection('coffee').doc(id).get()
            if(!itemCoffee.exists){
                console.log(`⚠️ Item dont exist in firestore`)
                return undefined
            }
            console.log(`✅ Founded coffee: ${JSON.stringify(itemCoffee.exists)}`)
            return CoffeeModel.fromInput(itemCoffee.data() as unknown as Coffee)
        } catch (error:any) {
            throw new CustomError(500, error.message);
        }
    }
    async deleteCoffee(id: string): Promise<boolean> {
        if(!id){
            console.error(`❌ Invalid coffee data provided! id: ${id}`);
            throw new CustomError(400, `❌ Invalid coffee data provided!  id: ${id}`);
        }
        console.log(`🔁 Initing process delete a coffee by id: ${id}`)
        try {
            const itemCoffee = await this.database.collection('coffee').doc(id).delete()
            console.log(`✅ Deleted coffee with id: ${id}`)
            return true
        } catch (error:any) {
            console.error(`❌ Error to delete coffee, error: ${error.message}`)
            return false
        }
    }

    async listAllCoffees():Promise<CoffeeModel[]>{
        console.log(`🔁 Quering all coffees in firestores...`)
        let coffees:CoffeeModel[] = []
        try {
            const response = await this.database.collection('coffee').where("entity", '==', 'COFFEE').get()
            response.forEach((item)=>{
                let coffeeModel = CoffeeModel.fromInput(item.data() as unknown as Coffee)
                coffees.push(coffeeModel)
            })
            console.log(`✅ Founded coffees: ${JSON.stringify(coffees)}`)
            return coffees
        } catch (error:any) {
            throw new CustomError(500, error.message);
        }
    }
}