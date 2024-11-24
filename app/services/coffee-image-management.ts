import { firestore } from "firebase-admin";
import { CoffeeImage } from "../interfaces/coffee-interfaces";
import { CustomError } from "../utils/custom-error-feedback";
import {
  FirebaseConfigFactory,
  FirebaseService,
  IFirebaseService,
} from "../.firebase/firebase-setup";
import { CoffeeImageModel } from "../models/coffeeImage";
import {
  CoffeeImageDao,
  ICoffeeImageDao,
} from "../repositories/coffee-image-dao";

export interface ICoffeeImageManagement {
  createCoffeeImage(coffee: CoffeeImageModel[]): Promise<CoffeeImageModel[]>;
  getCoffeeImageById(id: string): Promise<CoffeeImageModel | undefined>;
  deleteCoffeeImage(id: string): Promise<boolean>;
  listAllImagesFromCoffee(
    coffeeId: string
  ): Promise<CoffeeImageModel[]>;
}

export class CoffeeImageManagement implements ICoffeeImageManagement {
  private coffeeImageDao: ICoffeeImageDao;
  constructor() {
    this.coffeeImageDao = new CoffeeImageDao();
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
    try {
      const response = await this.coffeeImageDao.createCoffeeImage(
        coffeeImages
      );
      console.log(`✅ Coffee Images Created with success`);
      return coffeeImages;
    } catch (error: any) {
      console.log(
        `❌ Error to create images for coffee, error: ${error.message}`
      );
      throw new CustomError(
        500,
        `❌ Error to create images for coffee, error: ${error.message}`
      );
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

    try {
      const response = await this.coffeeImageDao.getCoffeeImageById(id);
      return response;
    } catch (error: any) {
      console.log(`❌ Error to get images for coffee, error: ${error.message}`);
      throw new CustomError(
        500,
        `❌ Error to get images for coffee, error: ${error.message}`
      );
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
      const response = await this.coffeeImageDao.deleteCoffeeImage(id);
      return response;
    } catch (error: any) {
      console.log(
        `❌ Error to create images for coffee, error: ${error.message}`
      );
      throw new CustomError(
        500,
        `❌ Error to create images for coffee, error: ${error.message}`
      );
    }
  }
  async listAllImagesFromCoffee(
    coffeeId: string
  ): Promise<CoffeeImageModel[]> {
    console.log(
      `🔁 Initing process to list all coffee images itens in coffee withid: ${coffeeId}`
    );
    try {
      const response = await this.coffeeImageDao.listAllImagesFromCoffee(
        coffeeId
      );
      console.log(response)
      return response;
    } catch (error: any) {
      console.log(
        `❌ Error to create images for coffee, error: ${error.message}`
      );
      throw new CustomError(
        500,
        `❌ Error to create images for coffee, error: ${error.message}`
      );
    }
  }
}
