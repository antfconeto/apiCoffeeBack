import { firestore } from "firebase-admin";
import { CoffeeImage } from "../interfaces/coffee-interfaces";
import { CustomError } from "../utils/custom-error-feedback";
import {
  FirebaseConfigFactory,
  FirebaseService,
  IFirebaseService,
} from "../.firebase/firebase-setup";
import { CoffeeImageModel } from "../models/coffeeImage";

export interface ICoffeeImageDao {
  createCoffeeImage(coffee: CoffeeImageModel[]): Promise<CoffeeImageModel[]>;
  getCoffeeImageById(id: string): Promise<CoffeeImageModel | undefined>;
  deleteCoffeeImage(id: string): Promise<boolean>;
  listAllImagesFromCoffee(
    coffeeId: string
  ): Promise<CoffeeImageModel[]>;
}

export class CoffeeImageDao implements ICoffeeImageDao {
  private database: firestore.Firestore;
  private firebaseService: IFirebaseService;
  constructor() {
    this.firebaseService = new FirebaseService(
      FirebaseConfigFactory.createConfig()
    );
    this.database = this.firebaseService.getDatabase();
  }
  async createCoffeeImage(
    coffeeImages: CoffeeImageModel[]
  ): Promise<CoffeeImageModel[]> {
    if (!coffeeImages || coffeeImages.length === 0) {
      console.error(
        `❌ Invalid coffee image data provided! data: ${JSON.stringify(
          coffeeImages
        )}`
      );
      throw new CustomError(400, "❌ Invalid coffee image data provided!");
    }
    console.log(`🔁 Initing process to create a image item in firestore`);

    try {
      const batch = this.database.batch();
      const coffeeCollection = this.database.collection("coffee");
      console.log(
        `✅ Batch created, adding items: ${JSON.stringify(coffeeImages)}`
      );
      coffeeImages.forEach((coffeeImage: CoffeeImageModel) => {
        let coffeeUnit = coffeeCollection.doc(coffeeImage.id);
        batch.set(coffeeUnit, coffeeImage.data);
      });
      await batch.commit();
      console.log(`✅ Coffee Images Created with success`);
      return coffeeImages;
    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  }
  async getCoffeeImageById(id: string): Promise<CoffeeImageModel | undefined> {
    if (!id) {
      console.error(
        `❌ Invalid coffee image data provided! data: ${JSON.stringify(id)}`
      );
      throw new CustomError(
        400,
        `❌ Invalid coffee image data provided! data: ${JSON.stringify(id)}`
      );
    }
    console.log(
      `🔁 Initing process to get a coffee image item with id: ${id} in firestore`
    );

    try {
      const response = await this.database
        .collection("coffee")
        .doc(`COFFEEIMAGE${id}`)
        .get();
      if (!response.exists) {
        console.log(`⚠️ Image with provided id, dont exist`);
        return undefined;
      }
      console.log(`Founded image: ${JSON.stringify(response.data())}`);
      const coffeeImage = CoffeeImageModel.fromInput(
        response.data() as CoffeeImage
      );
      return coffeeImage;
    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  }
  async deleteCoffeeImage(id: string): Promise<boolean> {
    if (!id) {
      console.error(
        `❌ Invalid coffee image data provided! data: ${JSON.stringify(id)}`
      );
      throw new CustomError(
        400,
        `❌ Invalid coffee image data provided! data: ${JSON.stringify(id)}`
      );
    }
    console.log(
      `🔁 Initing process to delete a coffee image item with id: ${id} in firestore`
    );
    try {
      const response = await this.database
        .collection("coffee")
        .doc(`COFFEEIMAGE${id}`)
        .delete();
      console.log(`✅ Image coffee deleted with success`);
      return true;
    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  }
  async listAllImagesFromCoffee(
    coffeeId: string
  ): Promise<CoffeeImageModel[]> {
    console.log(
      `🔁 Initing process to list all coffee images itens in coffee withid: ${coffeeId}`
    );
    try {
      const response = await this.database
        .collection("coffee")
        .where("entity", "==", "COFFEEIMAGE")
        .where("coffeeId", "==", coffeeId)
        .get();
      if (response.empty) {
        console.log(
          `No one image was found linked to coffee with id: ${coffeeId}`
        );
        return [];
      }

      let coffeeImages: CoffeeImageModel[] = [];
      response.forEach((item) => {
        coffeeImages.push(
          CoffeeImageModel.fromInput(item.data() as unknown as CoffeeImage)
        );
      });
      console.log(
        `✅ Founded coffees Images linked to coffee with id ${coffeeId}: ${JSON.stringify(
          coffeeImages
        )}`
      );
      return coffeeImages;
    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  }
}
