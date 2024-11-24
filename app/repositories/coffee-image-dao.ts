import { firestore} from "firebase-admin";
import { CoffeeImage } from "../interfaces/coffee-interfaces";
import { CustomError } from "../utils/custom-error-feedback";
import { FirebaseConfigFactory, FirebaseService, IFirebaseService } from "../.firebase/firebase-setup";
import { CoffeeImageModel } from "../models/coffeeImage";

export interface ICoffeeImageDao{
    createCoffeeImage(coffee:CoffeeImageModel):Promise<CoffeeImageModel>;
    getCoffeeImageById(id: string): Promise<CoffeeImageModel | undefined>;
    deleteCoffeeImage(id:string):Promise<boolean>;
    listAllImagesFromCoffee(id:string):Promise<CoffeeImageModel[]>;
}

export class CoffeeImageDao implements ICoffeeImageDao{
    private database:firestore.Firestore
    private firebaseService:IFirebaseService
    constructor(){
        this.firebaseService = new FirebaseService(FirebaseConfigFactory.createConfig())
        this.database = this.firebaseService.getDatabase()
    }
    createCoffeeImage(coffeeImage: CoffeeImageModel): Promise<CoffeeImageModel> {
        if(!coffeeImage){
            console.error(`❌ Invalid coffee image data provided! data: ${JSON.stringify(coffeeImage)}`);
            throw new CustomError(400, `❌ Invalid coffee image data provided! data: ${JSON.stringify(coffeeImage)}`);
        }
        console.log(`🔁 Initing process to create a image item in firestore`)

        try {
            
        } catch (error:any) {
            throw new CustomError(500, error.message)
        }
    }
    getCoffeeImageById(id: string): Promise<CoffeeImageModel | undefined> {
        if(!id){
            console.error(`❌ Invalid coffee image data provided! data: ${JSON.stringify(id)}`);
            throw new CustomError(400, `❌ Invalid coffee image data provided! data: ${JSON.stringify(id)}`);
        }
        console.log(`🔁 Initing process to get a coffee image item in firestore`)
        
        try {
            
        } catch (error:any) {
            throw new CustomError(500, error.message)
        }
    }
    deleteCoffeeImage(id: string): Promise<boolean> {
        if(!id){
            console.error(`❌ Invalid coffee image data provided! data: ${JSON.stringify(id)}`);
            throw new CustomError(400, `❌ Invalid coffee image data provided! data: ${JSON.stringify(id)}`);
        }
        console.log(`🔁 Initing process to delete a coffee image item in firestore`)
       
        try {
            
        } catch (error:any) {
            throw new CustomError(500, error.message)
        }
    }
    listAllImagesFromCoffee(id:string): Promise<CoffeeImageModel[]> {
        console.log(`🔁 Initing process to list all coffee images itens in coffee withid: ${id}`)
        
        try {
            
        } catch (error:any) {
            throw new CustomError(500, error.message)
        }
    }
}