import { Coffee } from "./interfaces/coffee-interfaces";
import { CoffeeModel } from "./models/coffee";
import {
  CoffeeManagement,
  ICoffeerManagement,
} from "./services/coffee-management";
interface Arguments {
  coffee: Coffee;
  coffeeId: string;
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
  const coffeeManager: ICoffeerManagement = new CoffeeManagement();
  console.log(
    `🎫 Received requisition type: ${fieldName}, with arguments: ${JSON.stringify(
      args
    )}`
  );
  // Exemplo de uso
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
        return await coffeeManager.listAllCoffees()
    default:
      throw new Error(`Handler not found for: ${fieldName}`);
  }
}
