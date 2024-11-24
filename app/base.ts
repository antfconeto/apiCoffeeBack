import { Coffee, CoffeeImage } from "./interfaces/coffee-interfaces";
import { CoffeeModel } from "./models/coffee";
import { CoffeeImageModel } from "./models/coffeeImage";
import {
  CoffeeImageManagement,
  ICoffeeImageManagement,
} from "./services/coffee-image-management";
import {
  CoffeeManagement,
  ICoffeerManagement,
} from "./services/coffee-management";
interface Arguments {
  coffee: Coffee;
  coffeeId: string;
  coffeeImageId: string;
  coffeeImage: CoffeeImage[];
}
export async function handlerEvent(
  _: any,
  args: Arguments,
  context: any,
  info: any
) {
  const fieldName = info.fieldName;
  const requestHeaders = context;
  const returnType = info.returnType;
  //-------init handlers----------
  const coffeeManager: ICoffeerManagement = new CoffeeManagement();
  const coffeeImageManager: ICoffeeImageManagement =
    new CoffeeImageManagement();
  console.log(
    `🎫 Received requisition type: ${fieldName}, with arguments: ${JSON.stringify(
      args
    )}`
  );
  switch (fieldName) {
    case "createCoffee":
      return await coffeeManager.createCoffee(
        CoffeeModel.fromInput(args.coffee)
      );
    case "updateCoffee":
      return await coffeeManager.updateCoffee(
        CoffeeModel.fromInput(args.coffee)
      );
    case "getCoffeeById":
      return await coffeeManager.getCoffeeById(args.coffeeId);
    case "deleteCoffee":
      return await coffeeManager.deleteCoffee(args.coffeeId);
    case "listAllCoffees":
      return await coffeeManager.listAllCoffees();
    case "deleteCoffeeImage":
      return await coffeeImageManager.deleteCoffeeImage(args.coffeeImageId);
    case "createCoffeeImage":
      let coffeeImages: CoffeeImageModel[] = [];
      args.coffeeImage.forEach((item) => {
        coffeeImages.push(CoffeeImageModel.fromInput(item));
      });
      return await coffeeImageManager.createCoffeeImage(coffeeImages);
    case "getCoffeeImageById":
      return await coffeeImageManager.getCoffeeImageById(args.coffeeImageId);
    case "listAllImagesFromCoffee":
      return await coffeeImageManager.listAllImagesFromCoffee(args.coffeeId);
    default:
      throw new Error(`❌ Handler not found for: ${fieldName}`);
  }
}
